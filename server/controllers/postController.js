const post = require('../model/postSchema');







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
  const react1=async (req,res)=>{
    console.log("react1")
    //res.status(201).send("react1")
    console.log(req.body)
try{

    const res1=await post.find({ react: { $elemMatch: { by: 'rmnprjrrr@gmail.com' } } })
    console.log(res1)
}catch(error){
    console.log(error)
}
res.status(201).send('wow')

  }




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
  

  
module.exports={getAll,react,react1}
