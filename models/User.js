const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema)
module.exports = User;
