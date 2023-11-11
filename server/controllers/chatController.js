const chat = require('../model/chatSchema');


const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier"); // To create a readable stream from the buffer.

cloudinary.config({ 
  cloud_name: 'dd5kr52er', 
  api_key: '171698977888645', 
  api_secret: 'yo2WxHhN6n42DHpQgEZif9tK6R0' 
});



const get = async (req, res) => {
    try {
        const room = req.body.room;

        // Use the `await` keyword when calling `chat.find()` and pass a valid query object
        const result = await chat.find({ room: room });

        // Use `res.status()` to set the HTTP status code, and send the result as JSON
        res.status(200).json(result);
    } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const up=async (req, res) => {
    console.log(req.file)
    try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }
    
        // Convert the buffer to a readable stream.
        const stream = streamifier.createReadStream(req.file.buffer.toString());
    
        const uploadOptions = {
          resource_type: "auto", // Automatically detect the resource type (image, video, etc.).
        };
    
        cloudinary.uploader
          .upload_stream(uploadOptions, (error, result) => {
            if (error) {
              console.error("Upload failed:", error);
              res.status(400).json({ error: "Upload failed" });
            } else {
              res.json({ public_id: result.public_id, url: result.secure_url });
            }
          })
          .end(req.file.buffer);
      } catch (error) {
        console.error("Upload failed:", error);
        res.status(400).json({ error: "Upload failed" });
      }
  }




module.exports = {get,up};
