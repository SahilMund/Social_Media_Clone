const Like = require("../models/like");
const Post =  require("../models/post");
const Comment = require('../models/comment');


module.exports.handleReactions = async function(req, res){
    try{

        let likeable;
        let deleted = false;

        //  Checking if the reacted item is Post/Comment
        if (req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }


        // check if a reaction already exists
        //  Case-1 : Exists with Reaction
        let existingLikeWithReaction = await Like.findOne({
            likeable: req.query.id,
            reaction:req.query.reaction,
            onModel: req.query.type,
            user: req.user._id
        })

         //  Case-2 : Exists without Reaction
        let existingLikeWithOutReaction = await Like.findOne({
            likeable: req.query.id,
            // reaction:req.query.reaction,
            onModel: req.query.type,
            user: req.user._id
        })

        
        if (existingLikeWithOutReaction){
            // if a reaction already exists with current reaction then delete it
            if(existingLikeWithReaction){
                likeable.likes.pull(existingLikeWithReaction._id);
                likeable.save();
    
                existingLikeWithReaction.remove();
                deleted = true;
            }else{
                
                // if reaction is present with different reaction then update the reaction
                likeable.likes.forEach(element => {
                    if(element.id == existingLikeWithOutReaction.id){
                        element.reaction = req.query.reaction;
                        element.save();
                    }
                });
                likeable.save();
            }
           

        }else{
            // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                reaction:req.query.reaction,
                onModel: req.query.type
            });

            likeable.likes.push(newLike);
            likeable.save();
            
        }
       
        
        // Let's populate all the reactions for current post, to show the count/reaction
        let sad = likeable.likes.filter((a) => {
            return a.reaction == "Sad"
         });
        sad = sad.map(a=> a.user);

        let wow = likeable.likes.filter((a) => {
            return a.reaction == "Wow"
         });
        wow = wow.map(a=> a.user);

        let love = likeable.likes.filter((a) => {
            return a.reaction == "Love"
         });
        love = love.map(a=> a.user);

        let angry = likeable.likes.filter((a) => {
            return a.reaction == "Angry"
         });
        angry = angry.map(a=> a.user);

        let like = likeable.likes.filter((a) => {
            return a.reaction == "Like"
         });
        like = like.map(a=> a.user);

    

        let emojiData =  {
            post_id : likeable._id,
            Sad : sad,
            Wow: wow,
            Love:love,
            Like : like,
            Angry : angry
            
        }
         
        // console.log("************EMOJI DATA",emojiData);
        return res.status(200).json( {
            message: "Request successful!",
            data: {
                deleted : deleted,
                reaction : req.query.reaction,
                totLike : likeable.likes.length,
                emojiData : emojiData,
                likeType : req.query.type
            }
        })



    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}