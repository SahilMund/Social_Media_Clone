const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    
    from_user: {  // Sender
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to_user: {  // receiver
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,chatroom: {  // ChatRoom is stored to populate the data from db fr each user's conversation
        type: String,
        required: true
    },
},{
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;