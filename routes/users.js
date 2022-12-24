const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update-profile/:id', passport.checkAuthentication, usersController.updateProfile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);
// router.post('/create-session', usersController.createSession);  // for manual auth - so commenting it

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);


//Google Oauth , SCOPE :- is the information that we want to fetch
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google',
             {failureRedirect: '/users/sign-in'}), usersController.createSession);




module.exports = router;
