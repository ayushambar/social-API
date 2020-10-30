const express = require('express');
const {createPost,getPosts} = require('../controllers/post');
const { createPostValidator } = require('../validator');	//dont need to write index because file ewith name 'index' is automatically loaded

const router = express.Router();		//for route handling

router.get("/", getPosts);	//taking request and gigving control to ../controllers/post
router.post("/post", createPostValidator, createPost);	//creating a post

module.exports = router;
