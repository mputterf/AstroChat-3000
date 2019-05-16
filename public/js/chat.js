var socket = io();

socket.on('connection', function (data) {
    socket.emit('join', 'Hello World from client');
});