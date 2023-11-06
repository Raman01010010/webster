const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');

exports.pending = async (req, res) => {
  try {
    const newuser = "dummy@gmail.com";
    console.log(newuser)

    // Find the matching connection where senderEmail is newuser
    const connections = await connectSchema.find({ senderEmail:newuser });

    // Extract the receiverEmail from the connections
    const receiverEmails = connections.map((connection) => connection.receiverEmail);

    console.log("jdfkjv",receiverEmails)
    res.json({ receiverEmails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching pending connections' });
  }
};
