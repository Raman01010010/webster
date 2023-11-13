// socket.js

const { Server } =require("socket.io");
const chatSchema =require("./model/chatSchema");
const allowedOrigin=require('./config/allowedOrigin')
function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: allowedOrigin}
    });

    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected`);

        // ... Your socket-related logic as shown in your original code ...

        socket.on('disconnect', () => {
            console.log("disconnected")
            // ... Handle user disconnection ...
        });

//Enter room
socket.on('enterRoom', ({ name, room }) => {

 console.log("cnxnm")

    //const user = activateUser(socket.id, name, room)

    // Cannot update previous room users list until after the state update in activate user 
   

    // join room 
    socket.join(room)

    // To user who joined 
   
    // To everyone else 
   // socket.broadcast.to(room).emit('message',{"name":"Raman","text":"3424helllo4323"})

    // Update user list for room 
    

    // Update rooms list for everyone 
   
})



//Messsage
socket.on('message', async ({ name, room, sender, receiver, content,other }) => {
    console.log("sent");

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
            "other":other
        });

        // Optionally, you can also emit the message to the sender if needed
        socket.emit('message', {
            "room": room,
            "sender": sender,
            "receiver": receiver,
            "content": content,
            "other":other
        });

        // ... Handle messages ...

    } catch (error) {
        console.error("Error handling the message:", error);
        // Handle the error in an appropriate way, e.g., send an error response.
    }
});


        socket.on('activity', (name) => {
            console.log("acc")
            // ... Handle activity ...
        });
    });
}
module.exports={initSocket}
