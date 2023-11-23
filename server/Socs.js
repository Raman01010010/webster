// socket.js

const { Server } = require("socket.io");
const chatSchema = require("./model/chatSchema");
const allowedOrigin = require('./config/allowedOrigin')
const Notification = require('./model/notifiSchema');
const { areUsersConnected } = require("./controllers/chatController");
const roomSchema = require("./model/roomSchema");
const chatRSchema = require("./model/chatRSchema");
let io
function splitStringByUnderscore(str) {
  return str.split('_');
}
const myMap = new Map();

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: allowedOrigin
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // ... Your socket-related logic as shown in your original code ...

    socket.on('disconnect', () => {
      console.log("disconnected")
      // ... Handle user disconnection ...
    });

    //Enter room
    socket.on('enterRoom', async({ name, room }) => {

      console.log("cnxnm")

      //const user = activateUser(socket.id, name, room)

      // Cannot update previous room users list until after the state update in activate user 

 
      socket.join(room)

      // To user who joined 

      // To everyone else 
      // socket.broadcast.to(room).emit('message',{"name":"Raman","text":"3424helllo4323"})

      // Update user list for room 


      // Update rooms list for everyone 

    })
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(userId, 'ghgh')
    });

    socket.on('sendNotificationtoone', async ({ userId, message, link, cat }) => {
      try {
        const newNotification = new Notification({ 'user': userId, 'message': message, 'category': cat, 'link': link });
        await newNotification.save();
        console.log(newNotification)
        // Broadcast the new notification to the target user
        io.to(userId).emit('newNotification', newNotification);
      } catch (error) {
        console.error('Error saving notification:', error.message);
      }
    });


    //Messsage
    socket.on('message', async ({ name, room, sender, receiver, content, other }) => {
      console.log("sent");
const ro=await roomSchema.find({room:room})
if(ro.length>0){
      try {
        // Create a new chat document
        const chat = new chatSchema({
          "room": room,
          "sender": sender,
          "receiver": receiver,
          "content": content
        });

        // Save the chat document to the database
        await chat.save();

        // Broadcast the message to everyone in the room except the sender
        socket.to(room).emit('message', {
          "room": room,
          "sender": sender,
          "receiver": receiver,
          "content": content,
          "other": other
        });

        // Optionally, you can also emit the message to the sender if needed
        socket.emit('message', {
          "room": room,
          "sender": sender,
          "receiver": receiver,
          "content": content,
          "other": other
        });

        // ... Handle messages ...

      } catch (error) {
        console.error("Error handling the message:", error);
        // Handle the error in an appropriate way, e.g., send an error response.
      }
    }
  
  
  });


    socket.on('activity', (name) => {
      console.log("acc")
      // ... Handle activity ...
    });

    socket.on('call', (data) => {
      console.log(data)

      io.to(data.remote).emit('newcall',data);
      // ... Handle activity ...
    });
    socket.on('accept', (data) => {
      console.log(data)
      io.to(data.origin).emit('final',data);
      // ... Handle activity ...
    });
socket.on('create',(data)=>{
  myMap.set(data.myid, data.callid);
  console.log(myMap.get(data.myid))
  console.log(data)
})




  });
}
function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }

  return io;
}

module.exports = {
  initSocket,
  getIo,
};
