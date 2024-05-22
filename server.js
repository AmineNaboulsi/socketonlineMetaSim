const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Enable CORS
app.use(cors());

let connectedUsers = [];

io.on('connection', (socket) => {
    console.log('A user connected, ID:', socket.id);

    // Add the new user to the connected users array
    connectedUsers.push(socket.id);

    // Check if there are two users connected
    if (connectedUsers.length === 2) {
        // Emit an event to both users
        io.emit('two users connected', connectedUsers);
    }

    // Listen for chat message from a client
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        // Broadcast the message to all clients
        io.emit('chat message', msg);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected, ID:', socket.id);
        // Remove the user from the connected users array
        connectedUsers = connectedUsers.filter(id => id !== socket.id);
    });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const HOST = '192.168.11.103';
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
