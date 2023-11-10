const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');
const Connection = connectSchema;

exports.addingSkill = async (req, res) => {
  try {
    const userEmail = req.body.userEmail; 
    const newSkill = req.body.editSkills;

    
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail }, 
      { $push: { skills: newSkill } },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Skill added successfully', user: updatedUser });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
