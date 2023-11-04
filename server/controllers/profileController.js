const profile = require('../model/profileSchema');



const naukari=async(req,res)=>{
    console.log(req.body)
    const pro =new profile(req.body)
    try{
       const re=await pro.save()
       console.log(re)
       
    }catch(error){
        console.log(error)
    }

}





module.exports={naukari}
