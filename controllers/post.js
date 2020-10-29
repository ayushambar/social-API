const Post = require('../models/post');

exports.getPosts = (req,res) => {
	res.json({
		posts : [{title:"first post"}, {title:"second post"}]
	});
};

exports.createPost = (req,res) => {
	const post = new Post(req.body);
	
	// post.save((err,result)=>{
	// 	// if(err){
	// 	// 	return res.status(400).json({				//can remove these since validator will take care of errors
	// 	// 		error : err
	// 	// 	});
	// 	// }
	// 	res.status(200).json({
	// 		post : result
	// 	});
	// });
	post.save()
	.then(result => {
		res.status(200).json({
			post:result
		});
	});

};