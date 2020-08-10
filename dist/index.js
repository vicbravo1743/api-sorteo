"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
require("./database/connection");
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./api/libs/auth"));
// Routes
const user_router_1 = __importDefault(require("./api/resources/users/user.router"));
const inspection_router_1 = __importDefault(require("./api/resources/inspections/inspection.router"));
const app = express_1.default();
passport_1.default.use(auth_1.default);
app.use(express_1.default.json());
// Router
app.use('/api/users', user_router_1.default);
app.use('/api/inspection', inspection_router_1.default);
app.use(passport_1.default.initialize());
app.listen(3002, () => {
    logger_1.default.info('Server is running in port 3002!');
});
