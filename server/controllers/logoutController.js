const User = require("../model/User.js");

exports.logout = async (req, res) => {
  const userId = req.body.userid;
console.log(userId)
  try {
    // Fetch the user from the database
    const user = await User.findById(userId);
console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's refresh token to null
    user.refreshToken = null;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Failed to logout on the server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
