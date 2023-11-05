const job = require('../model/jobSchema');



const create=async(req,res)=>{
    console.log(req.body)
    const pro =new job(req.body)
    try{
       const re=await pro.save()
       console.log(re)
       res.status(200).send("success")

       
    }catch(error){
        console.log(error)
        res.status(400).send("failed")
    }

}





module.exports={create}
