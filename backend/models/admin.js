const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    name: {
        type: String,
        required: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    issuper: { 
        type: Boolean, 
        required: false, 
    },
    questionnaires: {   //list of questionnaires.title
        type: [String],
        required: false,
    },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
