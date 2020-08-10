"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const revisionSchema = new mongoose_1.default.Schema({
    serial: {
        type: String,
        required: true,
    },
    acceptable: {
        type: Number,
        required: true
    },
    defects: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
}, { timestamps: true });
const InspectionSchema = new mongoose_1.default.Schema({
    area: {
        type: String,
        required: [true, 'El area de inspeccón es requerida'],
    },
    inspector: {
        type: String,
        required: [true, 'El inspector es requerido']
    },
    company: {
        type: String,
        required: [true, 'La empresa es requerida']
    },
    project: {
        type: String,
        required: [true, 'El proyecto es requerido']
    },
    revisions: [revisionSchema]
}, { timestamps: true });
exports.default = mongoose_1.default.model('Inspection', InspectionSchema);
