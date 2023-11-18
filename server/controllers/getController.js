const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');
const Connection = connectSchema;

exports.getAll = async (req, res) => {
  try {
    const emailToExclude = req.body.email;

    // Using $ne (not equal) in the query to exclude users with the specified email
    const users = await User.find({ email: { $ne: emailToExclude } });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
