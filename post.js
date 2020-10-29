const express = require('express');
const postController = require('../controllers/post');
const validator = require('../validator');	//dont need to write index because file ewith name 'index' is automatically loaded

const router = express.Router();		//for route handling

router.get("/", postController.getPosts);	//taking request and gigving control to ../controllers/post
router.post("/post", validator.createPostValidator, postController.createPost);	//creating a post

module.exports = router;
