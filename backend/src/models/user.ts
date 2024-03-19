import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: false, unique: false },
        phoneNumber: { type: Number, required: true, unique: true, trim: true },
        document: { type: String, required: false, unique: false },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);
