const User = require('../model/User.js');

exports.addeducation = async (req, res) => {
  try {
    const { institute, degree, year, email } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add new education to the array
    const newEducation = { org: institute, degree:degree, time: year };
    user.education.push(newEducation);


    await user.save();
    res.json({ message: 'Education added successfully', user });
  } catch (error) {
    console.error('Error adding education:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
