"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/sorteo4', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose_1.default.connection.on('error', () => {
    console.log('Error trying connecting to database');
    process.exit();
});
