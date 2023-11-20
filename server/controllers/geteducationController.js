const User = require('../model/User.js');
const connectSchema = require('../model/connectSchema.js');

exports.getEducation = async (req, res) => {
  try {
    const email = req.body.email; 

    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   
    const education = user.education || [];
   
    res.json(education);
    
  } catch (err) {
    console.error("Error fetching education:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
