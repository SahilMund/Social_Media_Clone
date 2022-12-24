const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PATH = path.join('/uploads/posts');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // post_pic: {
    //     type: String,
    //     required:true

    // },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});



// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '..', AVATAR_PATH));
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//       cb(null, file.fieldname + '-' + Date.now());
//     }
//   });


// // static functions
// postSchema.statics.uploadedPost = multer({storage:  storage}).single('post_pic');
// postSchema.statics.avatarPath = POST_PATH;


const Post = mongoose.model('Post', postSchema);
module.exports = Post;