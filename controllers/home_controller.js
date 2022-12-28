const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            
         options:{
            sort:{
                'createdAt':-1
            }},
            populate: {
                path: 'likes' // for comment likes
            }
        }).populate('likes');  // for post likes
    
        
        let users = await User.find({});
        let fList , sendList,receiveList;
        if(req.user){
            let currentUser = await User.findById(req.user._id);
            // console.log(users);
            let myFriendList = currentUser.friendList; // [{},{}]

            fList = myFriendList.filter((ele) => {
               return ele.status == "Friends"
            }); //[{userid,status,{}}]
            fList = fList.map(a => a.userid); // [userid1,id2]

            sendList = myFriendList.filter((ele) => {
                return ele.status == "Send"
            });
            sendList = sendList.map(a=> a.userid);
            receiveList = myFriendList.filter((ele) => {
                return ele.status == "Receive"
            });
            receiveList = receiveList.map(a=> a.userid);
            
            // console.log("FRIENDS " , fList);
            // console.log("sendList " , sendList);
            // console.log("receiveList " , receiveList);
           
        }

        if(req.user?.usertype == "Organization"){
            return res.render('organization_home_page', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users,
                fList:fList,
                sendList:sendList,
                receiveList:receiveList
    
            });
        }
        
        return res.render('personal_home_page', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users,
            fList:fList,
            sendList:sendList,
            receiveList:receiveList

        });



    }catch(err){
        console.log('Error', err);
        return;
    }
   
}


