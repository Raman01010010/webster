const post = require('../model/postSchema');

const Comment=require('../model/commentSchema')





const getAll=async(req,res)=>{
    console.log("dcnmdnvxv")
    console.log(req.body)
   // const {email}=req.body;
    const f1=await post.find({
     
    })
    console.log(f1)
    if(f1)
    res.status(201).send(f1)
else{
    res.status(202).send("none")
}

}

const react = async (req, res) => {
    try {
      console.log("Raman");
      console.log(req.body);
      const searchCriteria = {
        'react': {
          $elemMatch: {
            'by': 'rmprjrrr@gmail.com',
            'emoji':'congrats'
          }
        }
      };
      
      // Use the `find` method and execute it to get a promise
      post.find(searchCriteria)
        .then(posts => {
            console.log("find")
          console.log(posts);
        })
        .catch(err => {
          console.error(err);
        });
      // Check if 'id' is provided in the request body
      const id = req.body?.id;
  
      if (!id) {
        return res.status(400).send("Blank"); // 400 Bad Request
      }
  
      // Assuming you have a 'Post' model for MongoDB
      const upd = await post.findByIdAndUpdate(
        id,
        { $push: { react: req.body.react } },
        { new: true }
      );
  
     // console.log(upd);
  
      if (!upd) {
        return res.status(404).send("Post not found"); // 404 Not Found
      }
  
      res.status(201).send("Success"); // 201 Created
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed"); // 500 Internal Server Error
    }
  };




const react1 = async (req, res) => {
    console.log("react1");
    // res.status(201).send("react1");
    const emoji=req.body?.react?.emoji
    const by=req.body?.react?.by
    console.log(req.body);
    try {
        const { id } = req.body; // Assuming you pass the _id in the request body
        const res1 = await post.find({
            $and: [
                { _id: id }, // Match the _id
                { react: { $elemMatch: { by:by,emoji:emoji } } } // Match the 'react' condition
            ]
        });
        console.log(res1);
if(res1.length){
    const updateResult = await post.updateOne(
        {
            _id: id,
            'react.by': by // Match the document by _id and the 'react.by' email
        },
        {
            $pull: {
                react: { by: by, emoji:emoji} // Pull the entry with the specified email
            }
        }
    );
}else{
    const updateResult1 = await post.updateOne(
        {
            _id: id,
            'react.by': by // Match the document by _id and the 'react.by' email
        },
        {
            $pull: {
                react: { by: by} // Pull the entry with the specified email
            }
        })

        const updateResult2 = await post.updateOne(
            {
                _id: id,
                // Match the document by _id and the 'react.by' email
            },
            {
                $push: {
                    react: { by: by, emoji:emoji} // Pull the entry with the specified email
                }
            })


}




    } catch (error) {
        console.log(error);
    }
    res.status(201).send('wow');
}
const com=async(req,res)=>{
  console.log(req.body)
  try {
    // Extract the comment data from the request body
    const { postId, text, user } = req.body;

    // Create a new comment document
    const comment = new Comment({ postId, text, user });
    const incrementValue = 1;
    const result = await post.updateOne(
      { _id: postId },
      { $inc: { comm: incrementValue } }
    );
    console.log(result)
    // Save the comment to the database
    await comment.save();

    // Respond with a success message or the newly created comment
    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment' });
  }
}



const getCommentsForPost = async (req, res) => {
  try {
    // Extract the post ID from the request parameters
    const postId = req.body.postId;

    // Find all comments that have the same postId
    const comments = await Comment.find({ postId })//.populate('postID');

    // Respond with the list of comments
    res.json(comments);
  } catch (error) {
    console.error('Error retrieving comments:', error);
    res.status(500).json({ message: 'Error retrieving comments' });
  }
};


    // const query = {
    //     _id: req.body.id,
    //     "react.emoji": "like",
    //   };
  
    //   const projection = {
    //     "react.$": 1,
    //   };
  
    //   const result = await post.findOne(query, projection);
  
    //   if (result && result.reactions) {
    //     const usersWhoLiked = result.reactions.map(reaction => reaction.user_id);
    //     console.log('Users who liked the post:', usersWhoLiked);
    //   } else {
    //     console.log('Post not found or no users liked the post.');
    //   }
    // }
  
  // You should have a model 'Post' defined somewhere in your code, for example:
 // Import your Post model
  

  
module.exports={getAll,react,react1,com,getCommentsForPost}
