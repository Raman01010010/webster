const User = require('../model/User.js')
const connectSchema = require('../model/connectSchema.js');
const Connection = connectSchema;


exports.getAll = async (req,res) =>{ 
     
    const users = await User.find()

    res.status(200).json(users)

}