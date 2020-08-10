"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const addDate = winston_1.default.format((info) => {
    info.message = `${new Date().toISOString()} ${info.message}`;
    return info;
});
exports.default = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        }),
        new winston_1.default.transports.File({
            level: 'info',
            handleExceptions: true,
            format: winston_1.default.format.combine(addDate(), winston_1.default.format.simple()),
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/server-logs.log`,
        })
    ]
});
