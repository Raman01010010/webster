const chatSchema = require('../model/chatSchema');
const chat = require('../model/chatSchema');
const User = require('../model/User.js');


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
    console.log(req.body.json)

 
    try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }
    
        // Convert the buffer to a readable stream.
        const stream = streamifier.createReadStream(req.file.buffer.toString());
    
        const uploadOptions = {
          resource_type: "auto", // Automatically detect the resource type (image, video, etc.).
        };
   // let ch;
        cloudinary.uploader
          .upload_stream(uploadOptions, (error, result) => {
            if (error) {
              console.error("Upload failed:", error);
              res.status(400).json({ error: "Upload failed" });
            } else {
            const   ch={...JSON.parse(req.body.json),content:("_"+JSON.parse(req.body.json).content),other:{des:"jpg",link:result.secure_url}}
               console.log(ch)

               const ch1=new chatSchema(ch)
           const res7=   ch1.save()
              res.json(ch);


            }
          })
          .end(req.file.buffer);
         
      } catch (error) {
        console.error("Upload failed:", error);
        res.status(400).json({ error: "Upload failed" });
      }
  }





  const getLast = async (req, res) => {
   const email=req.body.email
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const connections = user.connection;

    try {
      
      // Find all users whose email is in the connections array
      const connectionData = await User.find({ email: { $in: connections } },'_id');
      const conn=connectionData.map(item=>{
        return item._id
      })
     // const mess=await chatSchema.find({ sender: { $in: conn} });

     const latestMessages = await Promise.all(
      conn.map(async (senderId) => {
        const latestMessage = await chatSchema
          .find({ sender: senderId })
          .sort({ createdAt: -1 })
          .limit(1);
    
        if (latestMessage.length > 0) {
          return latestMessage[0];
        } else {
          return { sender: senderId, message: 'No message found' }; // Customize as needed
        }
      })
    );


    const latestMessages1 = await Promise.all(
      latestMessages.map(async (senderId) => {
        const latestMessage = await User
          .find({ _id: senderId.sender })
          
    
        if (latestMessage.length > 0) {
          return {'username':latestMessage[0].username,...senderId};
        } else {
          return { sender: senderId,}; // Customize as needed
        }
      })
    );
    
    console.log(latestMessages);
    

      return res.status(200).json(latestMessages1);
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching connection data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching connections' });
  }
};

module.exports = {get,up,getLast};
