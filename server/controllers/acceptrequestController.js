const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');
const Connection = connectSchema;

exports.acceptrequest = async (req, res) => {
  try {
    const { senderEmail, receiverEmail } = req.body;
      //  console.log(senderEmail)
    // Find the connection
    const con = await Connection.findOne({
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
    });
     
    if (!con) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    // Update the connection to set isConnected to true
    con.isConnected = true;
    await con.save();

    // Update the "myConnections" field in the User schema for both sender and receiver
    const senderUser = await User.findOne({ email: senderEmail });
    const receiverUser = await User.findOne({ email: receiverEmail });

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    senderUser.connection.push(receiverEmail);
    receiverUser.connection.push(senderEmail);

    await senderUser.save();
    await receiverUser.save();

    // Delete the connection from the connectSchema
    await Connection.findOneAndDelete({ senderEmail: senderEmail, receiverEmail: receiverEmail });

    res.json({ message: 'Request accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while accepting the request' });
  }
};
