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
console.log(result)
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
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const connections = user.connection;
  
      try {
        // Find all users whose email is in the connections array
        const connectionData = await User.find(
          { email: { $in: connections } },
          '_id'
        );
        const conn = connectionData.map(item => item._id);
  
        const latestMessages = await Promise.all(
          conn.map(async (senderId) => {
            const sortedUserIds = [req.body.userid, senderId].sort();
            const uniqueRoomID = sortedUserIds.join('_');
            const latestMessage = await chatSchema
              .find({ room: uniqueRoomID })
              .sort({ timestamp: -1 })
              .limit(1);
  
            if (latestMessage.length > 0) {
              return latestMessage[0];
            } else {
              return { sender: senderId, content: 'No message found' };
            }
          })
        );
  
        const latestMessagesWithUsernames = await Promise.all(
          latestMessages.map(async (message) => {
            const otherUserId =
            message.sender.equals(user._id)
                ? message.receiver
                : message.sender;
               // console.log(req.body.userid)
               console.log(user._id)
                console.log(message.sender)
                console.log(otherUserId)
  
            const otherUser = await User.findById(otherUserId);
  
            if (otherUser) {
              return {
                username: otherUser.username,
                sender:otherUserId,
                message: message,
              };
            } else {
              return { sender: otherUserId };
            }
          })
        );
  
        //console.log(latestMessagesWithUsernames);
        return res.status(200).json(latestMessagesWithUsernames);
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: 'An error occurred while fetching connection data' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching connections' });
    }
  };
  



//const User = require('../model/User.js');

const areUsersConnected = async (userId1, userId2) => {
  if (!userId1|| !userId2) {
    console.log('Invalid user ID');
    return
  }
  const user1 = await User.findById(userId1);
  const user2 = await User.findById(userId2);

  if (!user1 || !user2) {
    console.log('Invalid user ID');
  }

  return user1.connection.includes(user2.email) && user2.connection.includes(user1.email);
};



const Room = require('../model/roomSchema');

const findReq = async (req,res) => {
  const userId = req.body.userid;
  try {
    const rooms = await Room.find({
      users: userId,
      accepted: { $ne: userId }
    }).populate(   {     path: 'accepted',
    select: '_Id username'} );



    const mess = await Promise.all(rooms.map(async (item) => {
      try {
        const latestMessages = await chatSchema.find({ room: item.room }).sort({ timestamp: -1 }).limit(1);
        return {item, latestMessages };
      } catch (err) {
        console.error(err);
        return item;
      }
    }));
    



    res.status(200).send(mess);
  } catch (error) {
    console.error('Error finding rooms:', error);
    throw error;
    res.status(404).send('failed');
  }
};

function splitStringByUnderscore(str) {
  return str.split('_');
}
const roomSchema=Room
const createR= async (req, res) => {
  const { room, name } = req.body;
  console.log(req.body)

  try {
    const two = splitStringByUnderscore(room);
    let ch;

    if (two?.length >= 2) {
      ch = await areUsersConnected(two[0], two[1]);
    }

    let updateQuery;

    if (ch) {
      updateQuery = {
        $addToSet: {
          active: name,
          accepted: { $each: [two[0], two[1]] },
        },
      };
    } else {
      updateQuery = {
        $addToSet: {
          active: name,
          accepted: name,
        },
      };
    }

    const updatedRoom = await roomSchema.findOneAndUpdate(
      { room: room, users: two },
      updateQuery,
      { new: true, upsert: true }
    );

    console.log('Updated or created room:', updatedRoom);
    res.status(200).json({ success: true, message: 'Room updated or created successfully' });
  } catch (error) {
    console.error('Error updating or creating room:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};










const findMain = async (req,res) => {
  const userId = req.body.userid;
  const userId2=""
  try {
    const rooms = await Room.find({
      users: userId,
      accepted:userId
    }).populate({
      path: 'users',
      select: '_id username'
    });
    
    
    


    const mess = await Promise.all(rooms.map(async (item) => {
      let other;
      

      if (item.users[0]._id.toString() === userId) {
        other = item.users[1];
      } else {
        other = item.users[0];
      }
      console.log(other)
      
      try {
        const latestMessages = await chatSchema.find({ room: item.room }).sort({ timestamp: -1 }).limit(1);
        return {'userid':other._id,'username':other.username,item, latestMessages };
      } catch (err) {
        console.error(err);
        return {'userid':other._id,'username':other.username,item, 'messages':[{"content":"Not found"}] };
      }
    }));
    



    res.status(200).send(mess);
  } catch (error) {
    console.error('Error finding rooms:', error);
    throw error;
    res.status(404).send('failed');
  }
};




module.exports = {get,up,getLast,areUsersConnected,findReq,createR,findMain};
