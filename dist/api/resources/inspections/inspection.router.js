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
const inspection_controller_1 = require("./inspection.controller");
const passport_1 = __importDefault(require("passport"));
const jwtAuthenticate = passport_1.default.authenticate('jwt', { session: false });
const inspectionRouter = express_1.default.Router();
inspectionRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inspections = yield inspection_controller_1.getAllInspections();
        return res.status(200).json(inspections);
    }
    catch (err) {
        return res.status(500).send(`Error al traer el listado de inspecciónes: ${err}`);
    }
}));
inspectionRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const inspection = yield inspection_controller_1.getInspectionById(id);
        return res.json(inspection);
    }
    catch (err) {
        return res.status(500).send(`Error al encontrar la inspeccion, error: ${err}`);
    }
}));
inspectionRouter.post('/', jwtAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inspection = req.body;
    const { revisions } = inspection;
    try {
        const newInspection = yield inspection_controller_1.createInspection(inspection, revisions);
        return res.json(newInspection);
    }
    catch (err) {
        return res.status(500).send(`Error al crearla inspección: ${err}`);
    }
}));
inspectionRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedInspection = req.body;
    try {
        const newInspection = yield updatedInspection(updatedInspection, id);
        return res.json(newInspection);
    }
    catch (err) {
        return res.status(500).send(`Error al actualizar la inspección. Error: ${err}`);
    }
}));
exports.default = inspectionRouter;
