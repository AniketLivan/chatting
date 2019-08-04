const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Filter = require('bad-words');

const publicPath = path.join(__dirname, '../public');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected to server');
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('sendLocation', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });



});




app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});