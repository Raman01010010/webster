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
module.exports={getAll}
