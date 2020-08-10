"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_controller_1 = require("../resources/users/user.controller");
exports.default = new passport_jwt_1.default.Strategy({
    secretOrKey: 'secretTemp',
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromHeader('authorization')
}, (jwtPayload, next) => {
    user_controller_1.getUserById(jwtPayload.user._id)
        .then(user => {
        if (!user) {
            return next(null, false);
        }
        delete user.password;
        next(null, Object.assign({}, user));
    })
        .catch(err => {
        console.log(err);
    });
});
