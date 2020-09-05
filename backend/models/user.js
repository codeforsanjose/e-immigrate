const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User;
