$(function () {
    var socket = io();
    // Get the message the user entered and send it to the server
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#message-box').val());
        $('#message-box').val('');
        return false;
    });

    // When we get a message from the server, append it to the chatbox
    socket.on('chat message', function (msg) {
        $('#messageList').append($('<li>').text(msg));
    });
});