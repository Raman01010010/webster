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


const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
const socketidToroom= new Map();
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
      console.log(room)
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




    socket.on("room:join", (data) => {
      console.log("joineddd")
      const { email, room } = data;
      console.log(room)
      socket.join(room);
      const socketidd = emailToSocketIdMap.get(room);
      //emailToSocketIdMap.set(email, socket.id);
     //socketidToRoomMap.set(room, socket.id);
   
     io.to(socket.id).emit("room:join", {"room":room});
      io.to(room).emit("user:joined", { id: socket.id });
      //io.emit("user:joined", { id: socket.id });
     
    });






    
    socket.on("user:call", ({ to, offer }) => {
      console.log(offer)
      io.to(to).emit("incomming:call", { from: socket.id, offer });
      console.log("gayaa")
    });
    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });
    socket.on("peer:nego:needed", ({ to, offer }) => {
      console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });
  
    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
  
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
