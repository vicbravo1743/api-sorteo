"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectionValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const blueprintInspection = joi_1.default.object().keys({
    area: joi_1.default.string().required(),
    inspector: joi_1.default.string().required(),
    company: joi_1.default.string().required(),
    project: joi_1.default.string().required(),
    revisions: joi_1.default.array().required()
});
exports.inspectionValidate = (req, res, next) => {
    const { error } = blueprintInspection.validate(req.body);
    if (error === undefined) {
        next();
    }
    else {
        return res.status(401).send('Revisar que los campos esten rellenos correctamente.');
    }
};
