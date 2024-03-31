const User = require("../model/User.js");
const connectSchema = require("../model/connectSchema.js");
const Connection = connectSchema;

const imageController = {
  uploadImage: async (req, res) => {
    try {
        console.log(req.body.email,"uu");
      // You can access the uploaded file details from req.file
      const profileImageFilename = req.file.filename;

      // Assuming you have the user's email in the request body
      const userEmail = req.body.email;

      // Update the user document with the new filename
      const user = await User.findOneAndUpdate(
        { email: userEmail },
        { $set: { picture: profileImageFilename } },
        { new: true }
      );
console.log(user?.picture)
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({
        success: true,
        message: 'Image uploaded successfully',
        filename: profileImageFilename,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = { imageController };
