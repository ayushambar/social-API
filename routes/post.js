const express = require('express');
const {createPost,getPosts} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();		//for route handling

router.get("/", getPosts);	//taking request and gigving control to ../controllers/post
router.post("/post", requireSignin, createPostValidator, createPost);	//creating a post
 
//if any route contains 'userId' , app will first execute userById()
router.param("UserId", userById);

module.exports = router;
