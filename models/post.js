const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PATH = path.join('/uploads/posts');
var deepPopulate = require('mongoose-deep-populate')(mongoose);


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    postpic: {
        type: String,
        required:true

    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
            
        }
    ]
},{
    timestamps: true
});



let poststorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(path.join(__dirname, '..', POST_PATH));
      cb(null, path.join(__dirname, '..', POST_PATH));
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.mimetype.split("/")[0] + "-" + file.fieldname + '-' + Date.now());
    }
  });


// static functions
postSchema.statics.uploadedPost = multer({storage:poststorage,
    fileFilter:function(req,file,cb) {
        //checks if file type is image or video
    if(file.mimetype.split("/")[0] =='image' || file.mimetype.split("/")[0] =='video'){
        //for allowing upload of ile
        cb(null, true);
    }
    else{
        //for reject file
        cb(null,false)
        //passing a error instead of rejecting 
        // cb(new Error('I don\'t have a clue!'))
    }
}
}).single('postpic');
// postSchema.statics.uploadedPost = multer({storage:  poststorage}).single('postpic');
postSchema.statics.postPath = POST_PATH;

// Pulging deep populate plugin to PostSchema
postSchema.plugin(deepPopulate, {
    whitelist: [
      'comments.user',
      'comments.likes'
    ]
  });
const Post = mongoose.model('Post', postSchema);
module.exports = Post;