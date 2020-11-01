const Post = require('../models/post');

exports.getPosts = (req,res) => {
	const posts = Post.find().
	select("_id title body")			//try this to mthod to show all users later
	.then((posts) => {
		res.json({posts})	//no need to write .status(200). because thats default in express framework //no need to write {posts : posts} because key and value have same name
	})
	.catch((err) => console.log(err));
};

exports.createPost = (req,res) => {
	const post = new Post(req.body);
	
	post.save()
	.then(result => {
		res.json({
			post:result
		});
	});

};