const job = require('../model/jobSchema');



const create=async(req,res)=>{
    console.log(req.body)
    const pro =new job(req.body)
    try{
       const re=await pro.save()
       console.log(re)
       
    }catch(error){
        console.log(error)
    }

}





module.exports={create}
