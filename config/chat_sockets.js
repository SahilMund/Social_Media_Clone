const Chat = require('../models/chat');
const User = require('../models/user');

// This will work as a server/observer and ejs part will work as client/subscriber
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    // on:- detecting an event e.g. in connection
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            socket.join(data.chatroom);

            //emit /send an event to all the users, that user is joined with the data
            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', async function(data){

            try{
            
            let sender = await User.findOne({email:data.user_email});
            let receiver = await User.findOne({email:data.to_user});
            console.log(sender,receiver);
            let newchat = await Chat.create({
                message:data.message,
                from_user: sender._id,
                to_user: receiver._id,
                chatroom:data.chatroom
            });
            // console.log(data);

            io.in(data.chatroom).emit('receive_message', data);
            }
            catch(err){
                console.log(err);
                return;
            }
        });

    });

}