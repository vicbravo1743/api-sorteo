import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    created_at?: string;
    updated_at?: string;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true } );

export default mongoose.model<IUser>('User', UserSchema);