"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validate_1 = require("./user.validate");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const jwtAuthenticate = passport_1.default.authenticate('jwt', { session: false });
const userRouter = express_1.default.Router();
userRouter.get('/', jwtAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_controller_1.getAllUsers();
        return res.json(users);
    }
    catch (error) {
        console.log(error);
    }
}));
userRouter.get('/:id', jwtAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_controller_1.getUserById(userId);
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).send('Error al encontrar el usuario');
    }
}));
userRouter.post('/', [user_validate_1.userValidate, jwtAuthenticate], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    user_controller_1.duplicatedUser(user.email)
        .then(duplicated => {
        if (duplicated) {
            return res.status(500).send('Este correo electronico ya esta en uso.');
        }
        else {
            bcrypt_1.default.hash(user.password, 10)
                .then(hashedPassword => {
                user_controller_1.createUser(user, hashedPassword)
                    .then(newUser => {
                    res.json(newUser);
                })
                    .catch(err => {
                    console.log(err);
                });
            })
                .catch(err => {
                console.log(err);
                return res.status(400).send('Error al encriptar la contraseña, intenta de nuevo mas tarde!');
            });
        }
    })
        .catch(err => {
        console.log(err);
        return res.status(500).send('Error en el servidor intentar mas tarde.');
    });
}));
userRouter.post('/login', [user_validate_1.loginValidate], (req, res) => {
    const userUnauthenticated = req.body;
    user_controller_1.getUserByEmail(userUnauthenticated.email)
        .then(userRegistered => {
        if (!userRegistered) {
            return res.status(400).send('El correo electronico no esta registrado');
        }
        bcrypt_1.default.compare(userUnauthenticated.password, userRegistered.password)
            .then(passwordCorrect => {
            if (passwordCorrect) {
                const token = jsonwebtoken_1.default.sign({
                    user: userRegistered,
                }, 'secretTemp', {
                    expiresIn: '24h'
                });
                return res.status(200).json({ token });
            }
            else {
                return res.status(401).send('Error al iniciar sesión, intente de nuevo más tarde!');
            }
        })
            .catch(err => {
            console.log(err);
        });
    })
        .catch(err => {
        console.log(err);
    });
});
exports.default = userRouter;
