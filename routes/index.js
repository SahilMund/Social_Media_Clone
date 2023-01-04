const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');

// home route 
router.get('/',passport.checkAuthentication, homeController.home);
router.get('/organization',passport.checkAuthentication, homeController.organizationHome);


router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));



module.exports = router;