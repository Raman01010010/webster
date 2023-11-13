const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');
const Connection = connectSchema;

const PostSchema = require('../model/postSchema.js');

exports.getpost = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email)
    // Use await to wait for the asynchronous operation
    const posts = await PostSchema.find({ email: email });

    // Send the posts as a response
    res.json(posts);
  } catch (err) {
    // Handle errors and send an error response
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
