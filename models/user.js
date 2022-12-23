const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    // to keep track of created_At and updated_at
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;