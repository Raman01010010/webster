const User = require('../model/User.js');

exports.myconnection = async (req, res) => {
  const newUserEmail = req.body.newUser;

  try {
    const user = await User.findOne({ email: newUserEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const connections = user.connection;

    try {
      
      // Find all users whose email is in the connections array
      const connectionData = await User.find({ email: { $in: connections } });
      return res.status(200).json(connectionData);
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching connection data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching connections' });
  }
};
