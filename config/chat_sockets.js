const Chat = require("../models/chat");
const User = require("../models/user");

// This will work as a server/observer and ejs part will work as client/subscriber
module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);

  // on:- detecting an event e.g. in connection
  io.sockets.on("connection", function (socket) {
    // console.log('new connection received', socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected!");
    });

    socket.on("join_room", async function (data) {
      socket.join(data.chatroom);

      //emit /send an event to all the users, that user is joined with the data
      io.in(data.chatroom).emit("user_joined", data);

      let sender = await User.findOne({ email: data.user_email });
      let receiver = await User.findOne({ email: data.receiver_email });

      let msgData = await Chat.find({
        $or: [
          {
            from_user: receiver._id,
            to_user: sender._id,
            chatroom: `FB_${receiver._id}_${sender._id}`,
          },
          {
            from_user: sender._id,
            to_user: receiver._id,
            chatroom: `FB_${sender._id}_${receiver._id}`,
          },
        ],
      })
        .sort("createdAt")
        .populate("from_user")
        .populate("to_user");

      io.in(data.chatroom).emit("populate_db_message", msgData);
    });

    //  detect send_message and broadcast to everyone in the room
    socket.on("send_message", async function (data) {
      try {
        let sender = await User.findOne({ email: data.user_email });
        let receiver = await User.findOne({ email: data.to_user });

        let newchat = await Chat.create({
          message: data.message,
          from_user: sender._id,
          to_user: receiver._id,
          chatroom: data.chatroom,
        });

        io.in(data.chatroom).emit("receive_message", data);
        io.in(data.chatroom2).emit("receive_message", data);
      } catch (err) {
        console.log(err);
        return;
      }
    });

    socket.on("send_link", function (data) {
      try {
        io.in(data.chatRoom1).emit("receive_link", data);
        io.in(data.chatRoom2).emit("receive_link", data);
      } catch (err) {
        console.log(err);
        return;
      }
    });
  });
};
