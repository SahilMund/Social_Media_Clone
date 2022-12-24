const Post = require('../models/post');
const Comment = require('../models/comment');
const fs = require('fs');
const path = require('path');

// NOTE : Currently not using this function
module.exports.createOld = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}


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

                if (post.postpic){
                    fs.unlinkSync(path.join(__dirname, '..', post.postpic));
                }
                console.log("call -1")

                // this is saving the path of the uploaded file into the avatar field in the user
                post.postpic = Post.postPath + '/' + req.file.filename;
            }
 
            console.log("call -2")

            let newPost = await Post.create(post);

            // if (req.xhr){
            //     //if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            //     newPost = await newPost.populate('user', 'name').execPopulate();
            //     console.log("call -3 " , newPost)

            //     return res.status(200).json({
            //         data: {
            //             post: newPost
            //         },
            //         message: "Post created!"
            //     });
            // }
    
            req.flash('success', 'Post published!');
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
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            
            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}