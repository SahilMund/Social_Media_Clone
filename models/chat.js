const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    // comment belongs to a user
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,chatroom: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;