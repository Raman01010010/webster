const User = require('../model/User.js');

exports.fetching = async (req, res) => {
  try {
    const userEmail = req.body.email; // Assuming the email is passed in the request body

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If the user is found, you can send the user data in the response
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
