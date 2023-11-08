const User = require('../model/User.js')


exports.getAll = async (req,res) =>{ 
     
    const users = await User.find()

    res.status(200).json(users)

}