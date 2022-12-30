const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}



module.exports.updateProfile = async function(req, res){
   

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);

            //as our form is multipart form, so we can't read it using req.params, so need to use multer req object
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.sendFriendRequest = async function(req, res){
    try{

        let sender = await User.findById(req.user.id);
        let receiver = await User.findById(req.params.id);

        let senderObj = {
            userid : req.params.id,
            status : "Send"
        }
        let receiverObj = {
            userid : req.user.id,
            status : "Receive"
        }

        sender.friendList.push(senderObj);
        sender.save();

        receiver.friendList.push(receiverObj);
        receiver.save();

        req.flash('success', "Friend Request Sent Successfully");
        return res.redirect('back');
        
    }
     
    catch(error){
        req.flash('error', error);
        return res.status(500).send(error);
    }
}

module.exports.acceptFriendRequest = async function(req, res){
    try{


        let acceptor = await User.findOne({_id : req.user.id});
        let requestor = await User.findOne({_id : req.params.id});

        //let's update the model

        acceptor.friendList.forEach((data) => {
            //if the request's userid and data's userid matches , make them friends 
            if(data.userid == req.params.id){
                data.status = "Friends";
            }
        });
        acceptor.save();

        requestor.friendList.forEach((data) => {
            if(data.userid == req.user.id){
                data.status = "Friends";
            }
        });
        requestor.save();

        req.flash('success', "Friend Request Accepted Successfully");
        return res.redirect('back');
        
    }
     
    catch(error){
        console.log(error);
        req.flash('error', error);
        return res.redirect('back');
    }
}

module.exports.removeFriendRequest = async function(req, res){
    try{
    console.log(`${req.user.id} wants to remove ${req.params.id} as a friend`);

    await User.findByIdAndUpdate(req.user.id, { $pull: {friendList: {userid : req.params.id}}});
    await User.findByIdAndUpdate(req.params.id, { $pull: {friendList: {userid:req.user.id}}});
    req.flash('success', "Friend/Follow Request Removed/Cancelled Successfully");
    return res.redirect('back');   
    }
catch(error){
    req.flash('error', error);
    return res.status(500).send(error);
}
}


module.exports.followRequest = async function(req, res){
    try{
    console.log(`${req.user.id} wants to follow ${req.params.id}`);

    let sender = await User.findById(req.user.id);
    let receiver = await User.findById(req.params.id);

        let senderObj = {
            userid : req.params.id,
            status : "Follower"
        }
        let receiverObj = {
            userid : req.user.id,
            status : "Following"
        }

        sender.friendList.push(senderObj);
        sender.save();

        receiver.friendList.push(receiverObj);
        receiver.save();

    req.flash('success', "You have followed the page Successfully");
    return res.redirect('back');   
    
    }
catch(error){
    req.flash('error', error);
    return res.status(500).send(error);
}
}



// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}



// get the sign up data
module.exports.create = function(req, res){

    try{
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    //as our form is multipart form, so we can't read it using req.params, so need to use multer req object
    User.uploadedAvatar(req, res, function(err){
        if (err) {console.log('*****Multer Error: ', err)}

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (req.file){
            // this is saving the path of the uploaded file into the avatar field in the user
            req.body.avatar = User.avatarPath + '/' + req.file.filename;
        }


        if (!user){
            try{
                console.log(req.body);
                User.create(req.body, function(err, user){
                    if(err){req.flash('error', err); return}
                    req.flash('success', 'You have signed up, login to continue!');
                    return res.redirect('/users/sign-in');
                });
            }
            catch(err){
                req.flash('error', err);
                return res.redirect('back');
            }
        }else{
            req.flash('error', 'Email already exists, Please SignIn to continue');
            return res.redirect('back');
        }

    });
});
    } catch(err){
        console.log(err);
        req.flash('error', err);
        return res.redirect('back');
    }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){

    console.log("called destroyed sesion..");

    
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');
        return res.redirect('/');
      });
    
}