const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');
const Connection = connectSchema;

exports.deleteConnection = async (req, res) => {
  const data = req.body;
  const newUseremail = data.newUser;
  const otheruseremail = data.otheruser;

  const newUser = await User.findOne({ email: newUseremail });

  if (!newUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const otherUser = await User.findOne({ email: otheruseremail });

  if (!otherUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Delete newUseremail from otherUser's connection
  const updatedConnectionOtherUser = otherUser.connection.filter((email) => email !== newUseremail);
  otherUser.connection = updatedConnectionOtherUser;

  // Delete otheruseremail from newUser's connection
  const updatedConnectionNewUser = newUser.connection.filter((email) => email !== otheruseremail);
  newUser.connection = updatedConnectionNewUser;

  try {
    await newUser.save();
    await otherUser.save();
    return res.status(200).json({ message: 'Connection deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error while updating the connection', error });
  }
};
