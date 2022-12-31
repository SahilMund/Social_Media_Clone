class ChatEngine{
    constructor(chatBoxId, userEmail, receiverEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.receiverEmail = receiverEmail;

        this.socket = io.connect('http://localhost:5000', { transports : ['websocket', 'polling', 'flashsocket'] });

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                receiver_email : self.receiverEmail,
                chatroom: 'FB'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
                
            // let newMessage = $('<li>');

            // let messageType = 'other-message';

            // newMessage.append($('<sub>', {
            //     'html': `${data.user_email} joined the chat`
            // }));

            // newMessage.addClass(messageType);

            // $('#chat-messages-list').append(newMessage);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            console.log("presses")
            let msg = $('#chat-message-input').val();

            console.log(msg);

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    to_user:self.receiverEmail,
                    chatroom: 'FB'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}