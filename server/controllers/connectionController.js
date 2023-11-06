const User = require('../model/User.js')
const connectSchema = require('../model/connectSchema.js')
const Connection = connectSchema

exports.connection = async (req,res) =>{
     
    const data = req.body;
    console.log(data);
    res.status(200).json(data)
    
    const newUser = data.newUser;
    const otheruser = data.otheruser;

    const a = await Connection.find({senderEmail:newUser,receiverEmail:otheruser})

    
   
   if(a.length==0){ 
    const prd = new Connection({
        senderEmail:newUser,
        receiverEmail:otheruser,
        isConnected:false,
        connectionTime:Date.now()
    })
    prd.save().then(doc => {
        console.log(doc);
    })
    .catch(err => {
        console.error(err);
    });
  }
}