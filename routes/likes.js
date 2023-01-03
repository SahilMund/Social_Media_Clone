const express = require('express');

const router = express.Router();
const likesController = require('../controllers/likes_controller');

//to handle post/comment reactions 
router.post('/toggle', likesController.handleReactions);


module.exports = router;