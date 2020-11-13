const _ = require('lodash');
const User = require('../models/user');

exports.userById = (req,res,next,id) => {
	User.findById(id).exec((err,user) => {
		 if(err || !user){
		 	return res.status(400).json({
		 		error : "User not found."
		 	});
		 }
		 req.profile = user ;		//adds profile object in req body with user info
		 next();
	});
};

//used when user tries to create,update or delete their post
exports.hasAuthorization = (req,res,next) => {
	const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
	if(!authorized){
		return res.status(403).json({
			error : "User is not authorized to perform this action"
		});
	}
};


exports.allUsers = (req,res) => {
	User.find((err,user) => {
		if(err){
			return res.status(400).json({
				error : err
			});
		}
		res.json(user);
	}).select("name email updated created");
};


exports.getUser = (req,res) => {
	req.profile.hashed_password = undefined;
	req.profile.salt = undefined;
	return res.json(req.profile);
};



exports.updateUser = (req,res,next) => {
	let user = req.profile;
	user = _.extend(user, req.body); 		//extend - mutate the source object
	user.updated = Date.now();
	user.save((err) => {
		if(err){
			return res.status(400).json({
				error : "You are not authorized to perform this operation."
			});
		}
		user.hashed_password = undefined;
		user.salt = undefined;
		res.json(user);
	});
};


exports.deleteUser = (req,res,next) => {
	let user = req.profile;
	user.remove((err,user) => {
		if(err){
			return res.status(400).json({
				err : err
			});
		}
		res.json({ message : "User deleted successfully."});
	})
}
