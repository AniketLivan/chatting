const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected to server'); 
    });

    socket.emit('newMessage', {
        from: 'All',
        text: 'yooohoooa',
        createdAt:1213
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    

});




app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});