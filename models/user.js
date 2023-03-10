const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },
    avatar: {
        type: String

    },
    usertype : {
        type: String,
        default : "Personal",
        required: true
    },

    //to implement friend request feature, it will be an array of objects with a status of it's friendship
    friendList:[{ 
        userid : {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        },
        status : { // "Sent" / "Received" / "Friends"/ "Following" / "Follower"
            type: String
        }
    }]
}, {
    timestamps: true
});


//setting up diskStorage for userSchema
let userstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.fieldname + '-' + Date.now());
    }
  });


// static functions
userSchema.statics.uploadedAvatar = multer({storage:  userstorage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;



const User = mongoose.model('User', userSchema);

module.exports = User;