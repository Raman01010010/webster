// socket.js

const { Server } =require("socket.io");
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
            // ... Handle user disconnection ...
        });

        socket.on('message', ({ name, text }) => {
            // ... Handle messages ...
        });

        socket.on('activity', (name) => {
            // ... Handle activity ...
        });
    });
}
module.exports={initSocket}
