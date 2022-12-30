const Post = require('../models/post');
const Comment = require('../models/comment');
const fs = require('fs');
const path = require('path');
const Like = require('../models/like');




module.exports.create = function(req, res){
    try{
        console.log("create contoroller called")
        

        Post.uploadedPost(req, res, async function(err){

           console.log(req.body,req.file);
         
            if (err) {console.log('*****Multer Error: ', err)}

            let post = {
                content: req.body.content,
                user: req.user._id
               
            };

            console.log(post);
            if (req.file){
                // this is saving the path of the uploaded file into the avatar field in the user
                
                post.postpic =  Post.postPath + '/' + req.file.filename ;
                let newPost = await Post.create(post);

                req.flash('success', 'Post published!');
                return res.redirect('back');
            }
    
            req.flash('error', 'Error in file type');
            return res.redirect('back');
           
        }); 

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

             // CHANGE :: delete the associated likes for the post and all its comments' likes too
             await Like.deleteMany({likeable: post, onModel: 'Post'});
             await Like.deleteMany({_id: {$in: post.comments}});
 
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            
            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        console.log(err);
        req.flash('error', err);
        return res.redirect('back');
    }
    
}