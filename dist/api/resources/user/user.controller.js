"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUserById = exports.duplicatedUser = exports.createUser = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("./user.model"));
function getAllUsers() {
    return user_model_1.default.find({});
}
exports.getAllUsers = getAllUsers;
function createUser(user, hashedPassword) {
    return new user_model_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword })).save();
}
exports.createUser = createUser;
function duplicatedUser(email) {
    return new Promise((resolve, reject) => {
        user_model_1.default.find().or([{ 'email': email }])
            .then(users => {
            resolve(users.length > 0);
        })
            .catch(error => {
            reject(error);
        });
    });
}
exports.duplicatedUser = duplicatedUser;
function getUserById(id) {
    return user_model_1.default.findById(id);
}
exports.getUserById = getUserById;
function getUserByEmail(email) {
    return user_model_1.default.findOne().where({ 'email': email });
}
exports.getUserByEmail = getUserByEmail;
