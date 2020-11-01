const express = require('express');
const {signup, signin, signout} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const { userSignupValidator } = require('../validator');

const router = express.Router();		//for route handling

router.post("/signup", userSignupValidator, signup);	
router.post("/signin", signin);
router.get("/signout", signout);

//if any route contains 'userId' , app will first execute userById()
router.param("UserId", userById);

module.exports = router;
