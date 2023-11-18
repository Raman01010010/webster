const User = require("../model/User.js");

exports.uploadProfileImage = async (req, res) => {
  try {
    // Extract user email from request body
    const userEmail = req.body.email;

    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, message: "User email not provided" });
    }

    // Update the user's profile image in the database
    // Update the user's profile image in the database
    const profileImageFilename = req.file.filename.toString();

    console.log(
      "Email:",
      userEmail,
      "Profile Image Filename:",
      profileImageFilename
    );

    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { picture: profileImageFilename },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
