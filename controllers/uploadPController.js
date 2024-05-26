const User = require("../model/User.js");

const uploadProfilePic = async (req, res) => {
  try {
    const payload = req.body;
    const email = payload.email;
    const imgurl = payload.imgurl;

    // Find the user by email
    const newUser = await User.findOne({ email: email });

    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile picture URL
    newUser.picture = imgurl;
    await newUser.save();
    console.log("Mai aa gya",newUser);
    return res.status(200).json({ message: "Profile picture updated successfully", imgurl: imgurl });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { uploadProfilePic };
