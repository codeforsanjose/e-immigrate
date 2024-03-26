import mongoose from 'mongoose';
import { WithMongooseTimestamps } from './core/types.js';


export type UserEntity = WithMongooseTimestamps<{
    name?: string;
    phoneNumber: string;
    document?: string;
}>;
const userSchema = new mongoose.Schema<UserEntity>(
    {
        name: { type: String, required: false, unique: false },
        phoneNumber: { type: String, required: true, unique: true, trim: true },
        document: { type: String, required: false, unique: false },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<UserEntity>('User', userSchema);
