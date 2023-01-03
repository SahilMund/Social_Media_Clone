const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

// Create route for comments
router.post('/create', passport.checkAuthentication, commentsController.create);
// Delete route for comments
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);


module.exports = router;