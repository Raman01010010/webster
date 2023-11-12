const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');
const Connection = connectSchema;

exports.deletingSkill = async (req, res) => {
  try {
    const index = req.body.index;
    const newUserEmail = req.body.userEmail;

    // Find the user based on the email
    const user = await User.findOne({ email: newUserEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the index is within the bounds of the array
    if (index < 0 || index >= user.skills.length) {
      return res.status(400).json({ message: 'Invalid skill index' });
    }

    // Remove the skill at the specified index
    user.skills.splice(index, 1);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ message: 'Skill deleted successfully', user: updatedUser });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
