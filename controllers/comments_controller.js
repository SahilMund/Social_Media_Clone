const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');


module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
           
            post.comments.push(comment);
            post.save();


            // Similar for comments to fetch the user's id!
            comment = await comment.populate('user', 'name email').execPopulate();
            
            // commentsMailer.newComment(comment);

            //if queue is not present, it will create a new queue and push the job to it, else it will push the job
            let job = queue.create('emails', comment).save(function(err){
                if (err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);

            })


            req.flash('success', 'Comment published!');

            res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

       // console.log(comment);
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

             // CHANGE :: destroy the associated likes for this comment
            let likeDel = await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        req.flash('error', err);
        return;
    }
    
}