const Post = require('../models/post');
const User = require('../models/user');

const Like = require('../models/like');


module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'user',
                model:'User'
            },
            
         options:{
            sort:{
                'createdAt':-1
            }},
            populate: {
                path: 'likes',
                model:'Like' // for comment likes
            },
            populate: {
                path: 'user',
                model:'User' // for comment user
            }
        }).populate('likes'); // for post likes
    
        
        
        let users = await User.find({});
        let fList , sendList,receiveList,followerList,followingList;
        if(req.user){
            let currentUser = await User.findById(req.user._id);
            // console.log(users);
            let myFriendList = currentUser.friendList; // [{},{}]

            fList = myFriendList.filter((ele) => {  
               return ele.status == "Friends"
            }); //[{userid1,status,{}}]
            fList = fList.map(a => a.userid); // [userid1,id2]

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
            
            // console.log("FRIENDS " , fList);
            // console.log("sendList " , sendList);
            // console.log("receiveList " , receiveList);
           
        }

        if(req.user?.usertype == "Organization"){
            return res.render('organization_home_page', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users,

                followingList:followingList,
                followerList:followerList

    
            });
        }

        // the below code is for emoji/reactions in post
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
        //    console.log("print ele",ele);
        //    console.log("print ele",ele.emojiData);
           
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


