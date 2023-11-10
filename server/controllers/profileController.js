const profile = require('../model/profileSchema');



const naukari=async(req,res)=>{
    console.log("6666")
    console.log(req.body)
    // const { name, email,pwd,username } = req.body

    const pro =new profile(req.body)
    try{
       const re=await pro.save()
       console.log("yaha2")

       console.log(re)
       res.status(200).send("success")
    }catch(error){
        console.log(error)
        console.log("yaha2")
        res.status(400).send("failed")
    }

}





module.exports={naukari}
