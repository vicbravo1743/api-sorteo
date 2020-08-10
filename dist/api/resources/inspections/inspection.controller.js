"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInspection = exports.updateInspection = exports.createInspection = exports.getInspectionById = exports.getAllInspections = void 0;
const inspection_model_1 = __importDefault(require("./inspection.model"));
function getAllInspections() {
    return inspection_model_1.default.find({});
}
exports.getAllInspections = getAllInspections;
function getInspectionById(id) {
    return inspection_model_1.default.findById(id);
}
exports.getInspectionById = getInspectionById;
function createInspection(inspection, revisions) {
    return new inspection_model_1.default(Object.assign(Object.assign({}, inspection), { revisions })).save();
}
exports.createInspection = createInspection;
function updateInspection(inspection, id) {
    return inspection_model_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, inspection), {
        new: true
    });
}
exports.updateInspection = updateInspection;
function deleteInspection(id) {
    return inspection_model_1.default.findByIdAndRemove(id);
}
exports.deleteInspection = deleteInspection;
