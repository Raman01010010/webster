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
const showjob=async(req,res)=>{
    //const pro =new job(req.body)
    try{
       const re=await job.find()
       console.log(re)
       res.status(200).send(re)

       
    }catch(error){
        console.log(error)
        res.status(400).send("failed")
    }
   // res.status(200).send(res)
}
module.exports={create,showjob}
