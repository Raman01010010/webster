const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');

exports.pending = async (req, res) => {
  try {
    const newuser = req.body.newUser;

   console.log(req.body)
    const connections = await connectSchema.find({ receiverEmail:newuser });
   
    res.send(connections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching pending connections' });
  }
};
