const Post = require('../models/post');
const User = require('../models/user');

const Like = require('../models/like');


module.exports.home = async function(req, res){

    try{
        // populate the users,comments,likes of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate('likes')
        .populate({
            path:'comments',
            options:{
               sort:{
                   'createdAt':-1
               }
            }
        }).deepPopulate('comments.user comments.likes'); // using deepPopulate to extract comment's users and likes

        // for post like
        let users = await User.find({});
        let fList , sendList,receiveList,followerList,followingList;
        if(req.user){
            // Creating the friendlist arrays for all status of the current loggedin user
            let currentUser = await User.findById(req.user._id);
           
            let myFriendList = currentUser.friendList; 

            fList = myFriendList.filter((ele) => {  
               return ele.status == "Friends"
            });
            fList = fList.map(a => a.userid);

            sendList = myFriendList.filter((ele) => {
                return ele.status == "Send"
            });
            sendList = sendList.map(a=> a.userid);
            
            receiveList = myFriendList.filter((ele) => {
                return ele.status == "Receive"
            });
            receiveList = receiveList.map(a=> a.userid);

            followerList = myFriendList.filter((ele) => {
                return ele.status == "Follower"
            });
            followerList = followerList.map(a=> a.userid);

            followingList = myFriendList.filter((ele) => {
                return ele.status == "Following"
            });
            followingList = followingList.map(a=> a.userid);
           
        }

        //  If user type is organization then render organization home page 
        if(req.user?.usertype == "Organization"){
            return res.render('organization_home_page', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users,

                followingList:followingList,
                followerList:followerList

    
            });
        }


       
        // poupulating post's reaction, with it's reactions array to display in ejs
        posts.forEach(ele =>{
        
        let sad = ele.likes.filter((a) => {
            return a.reaction == "Sad"
         });
        sad = sad.map(a=> a.user);

        let wow = ele.likes.filter((a) => {
            return a.reaction == "Wow"
         });
        wow = wow.map(a=> a.user);

        let love = ele.likes.filter((a) => {
            return a.reaction == "Love"
         });
        love = love.map(a=> a.user);

        let angry = ele.likes.filter((a) => {
            return a.reaction == "Angry"
         });
        angry = angry.map(a=> a.user);

        let like = ele.likes.filter((a) => {
            return a.reaction == "Like"
         });
        like = like.map(a=> a.user);


           ele.emojiData =  {
            post_id : ele._id,
            sad : sad,
            wow: wow,
            love:love,
            like : like,
            angry : angry
            
        }


     ele.postTimeStamp = ele.createdAt.toDateString();
           ele.save();
           
        });


        // poupulating comment's reaction, with it's reactions array to display in ejs

        posts.forEach(postEle =>{
        
            // console.log(postEle);
            postEle.comments.forEach(ele => {

                let csad = ele.likes.filter((a) => {
                    return a.reaction == "Sad"
                 });
                csad = csad.map(a=> a.user);
        
                let cwow = ele.likes.filter((a) => {
                    return a.reaction == "Wow"
                 });
                cwow = cwow.map(a=> a.user);
        
                let clove = ele.likes.filter((a) => {
                    return a.reaction == "Love"
                 });
                clove = clove.map(a=> a.user);
        
                let cangry = ele.likes.filter((a) => {
                    return a.reaction == "Angry"
                 });
                cangry = cangry.map(a=> a.user);
        
                let clike = ele.likes.filter((a) => {
                    return a.reaction == "Like"
                 });
                clike = clike.map(a=> a.user);
        
        
                   ele.commentEmojiData =  {
                    post_id : ele._id,
                    sad : csad,
                    wow: cwow,
                    love:clove,
                    like : clike,
                    angry : cangry
                    
                }
                   ele.save();
                
              
                   
            });
            
        });
        

        return res.render('personal_home_page', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users,
            fList:fList,
            sendList:sendList,
            receiveList:receiveList,
            followerList : followerList

        });



    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

module.exports.organizationHome = async function(req, res){

    try{
        // populate the users,comments,likes of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate('likes')
        .populate({
            path:'comments',
            options:{
               sort:{
                   'createdAt':-1
               }
            }
        }).deepPopulate('comments.user comments.likes'); // using deepPopulate to extract comment's users and likes

        // for post like
        let users = await User.find({});
        let fList , sendList,receiveList,followerList,followingList;
        if(req.user){
            // Creating the friendlist arrays for all status of the current loggedin user
            let currentUser = await User.findById(req.user._id);
           
            let myFriendList = currentUser.friendList; 

            fList = myFriendList.filter((ele) => {  
               return ele.status == "Friends"
            });
            fList = fList.map(a => a.userid);

            sendList = myFriendList.filter((ele) => {
                return ele.status == "Send"
            });
            sendList = sendList.map(a=> a.userid);
            
            receiveList = myFriendList.filter((ele) => {
                return ele.status == "Receive"
            });
            receiveList = receiveList.map(a=> a.userid);

            followerList = myFriendList.filter((ele) => {
                return ele.status == "Follower"
            });
            followerList = followerList.map(a=> a.userid);

            followingList = myFriendList.filter((ele) => {
                return ele.status == "Following"
            });
            followingList = followingList.map(a=> a.userid);
           
        }

      


       
        // poupulating post's reaction, with it's reactions array to display in ejs
        posts.forEach(ele =>{
        
        let sad = ele.likes.filter((a) => {
            return a.reaction == "Sad"
         });
        sad = sad.map(a=> a.user);

        let wow = ele.likes.filter((a) => {
            return a.reaction == "Wow"
         });
        wow = wow.map(a=> a.user);

        let love = ele.likes.filter((a) => {
            return a.reaction == "Love"
         });
        love = love.map(a=> a.user);

        let angry = ele.likes.filter((a) => {
            return a.reaction == "Angry"
         });
        angry = angry.map(a=> a.user);

        let like = ele.likes.filter((a) => {
            return a.reaction == "Like"
         });
        like = like.map(a=> a.user);


           ele.emojiData =  {
            post_id : ele._id,
            sad : sad,
            wow: wow,
            love:love,
            like : like,
            angry : angry
            
        }
           ele.save();
           
        });


        // poupulating comment's reaction, with it's reactions array to display in ejs

        posts.forEach(postEle =>{
        
            // console.log(postEle);
            postEle.comments.forEach(ele => {

                let csad = ele.likes.filter((a) => {
                    return a.reaction == "Sad"
                 });
                csad = csad.map(a=> a.user);
        
                let cwow = ele.likes.filter((a) => {
                    return a.reaction == "Wow"
                 });
                cwow = cwow.map(a=> a.user);
        
                let clove = ele.likes.filter((a) => {
                    return a.reaction == "Love"
                 });
                clove = clove.map(a=> a.user);
        
                let cangry = ele.likes.filter((a) => {
                    return a.reaction == "Angry"
                 });
                cangry = cangry.map(a=> a.user);
        
                let clike = ele.likes.filter((a) => {
                    return a.reaction == "Like"
                 });
                clike = clike.map(a=> a.user);
        
        
                   ele.commentEmojiData =  {
                    post_id : ele._id,
                    sad : csad,
                    wow: cwow,
                    love:clove,
                    like : clike,
                    angry : cangry
                    
                }
                   ele.save();
                
              
                   
            });
            
        });
        
          //  If user type is organization then render organization home page 

            return res.render('organization_home_page', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users,

                followingList:followingList,
                followerList:followerList

    
            });
        

      

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}
