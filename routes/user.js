const express = require('express');
const {userById, allUsers, getUser, updateUser, deleteUser, userPhoto} = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');

const router = express.Router();		//for route handling

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);

//Photo
router.get("/user/photo/:userId", userPhoto);

//if any route contains 'userId' , app will first execute userById()
router.param("userId", userById);

module.exports = router;
