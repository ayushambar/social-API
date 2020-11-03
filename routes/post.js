const express = require('express');
const {createPost,
	getPosts,
	postsByUser,
	postById,
	isPoster,
	updatePost,
	deletePost
} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();		//for route handling

router.get("/posts", getPosts);	//taking request and gigving control to ../controllers/post
router.post("/post/new/:UserId", requireSignin, createPost, createPostValidator);	//creating a post
router.get("/posts/by/:UserId", requireSignin, postsByUser);			//check for capital U in UserId
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
 
//if any route contains 'userId' , app will first execute userById()
router.param("UserId", userById);
//if any route contains 'postId' , app will first execute postById()
router.param("postId", postById);

module.exports = router;
