import mongoose, { Document } from 'mongoose';

export interface IInspection extends Document {
    area: string;
    inspector: string;
    company: string;
    project: string;
    revisions: [{}]
}

const revisionSchema = new mongoose.Schema({
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

const InspectionSchema = new mongoose.Schema({
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
    revisions: [ revisionSchema ]
}, { timestamps: true });

export default mongoose.model<IInspection>('Inspection', InspectionSchema);



