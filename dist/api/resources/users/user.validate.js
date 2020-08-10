"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = exports.userValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const blueprintUsuario = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    surname: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).max(10).required(),
    role: joi_1.default.string().required()
});
const blueprintLogin = joi_1.default.object().keys({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6).max(10)
});
exports.userValidate = (req, res, next) => {
    const { error } = blueprintUsuario.validate(req.body);
    if (error === undefined) {
        next();
    }
    else {
        return res.status(422).send('Información del usuario incompleta, favor de revisar que no falte ningun campo por rellenar.');
    }
};
exports.loginValidate = (req, res, next) => {
    const { error } = blueprintLogin.validate(req.body);
    if (error === undefined) {
        next();
    }
    else {
        return res.status(422).send('Información para inciar sesión incompleta, favor de revisar los campos.');
    }
};
