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
        res.status(400).send("22222")
    }

}
// const jobapply=async(req,res)=>{
//     try{
//         const 
//     }    
// }
const showjob=async(req,res)=>{
    //const pro =new job(req.body)
    try{
       const re=await job.find()
       console.log(re)
       res.status(200).send(re)
    }catch(error){
        console.log(error)
        res.status(400).send("11111")
    }
}


const myjob = async (req, res) => {
    try {
      const jobberId = req.body.jobberid; // Access jobberid from the request body
      console.log(jobberId); 
      const jobs = await job.find({ jobberid: jobberId }); // Search for jobs with the given jobberid
      console.log(jobs);
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(400).send("Failed to retrieve job data");
    }
  };
module.exports={create,showjob,myjob}
