const Like = require("../models/like");
const Post =  require("../models/post");
const Comment = require('../models/comment');


module.exports.handleReactions = async function(req, res){
    try{

        let likeable;
        let deleted = false;


        if (req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            console.log("comemnt called");
            likeable = await Comment.findById(req.query.id).populate('likes');
        }


        // check if a like already exists
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

        // if a like already exists then delete it
        if (existingLikeWithOutReaction){

            if(existingLikeWithReaction){
                likeable.likes.pull(existingLikeWithReaction._id);
                likeable.save();
    
                existingLikeWithReaction.remove();
                deleted = true;
            }else{
                
                // like present with different reaction then update the reaction
                likeable.likes.forEach(element => {
                    if(element.id == existingLikeWithOutReaction.id){
                        // console.log("claled inner ", req.query.reaction)
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
       
        // console.log("*******callig comments in likes controlller",likeable);
        
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
         
        console.log("************EMOJI DATA",emojiData);
        return res.json(200, {
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