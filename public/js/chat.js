$(function () {
    // var userID = 1;

    var socket = io();
    // Get the message the user entered and send it to the server and databse
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        var message = $('#message-box').val();

        socket.emit('chat message', message);


        // console.log("Message: ", message);

        // Create message object for sending to database
        // var userPost = {
        //     textInput: message,
        //     UserId: userID
        // };

        // post route for sending message to database
        // $.post("/api/posts", userPost, function () {
        //     console.log("Message sent to db");
        // });

        // clear message box after we send everything
        $('#message-box').val('');

        return false;
    });

    // When we get a message from the server, append it to the chatbox
    socket.on('chat message', function (msg) {
        $('#messageList').append($('<li>').html(msg));
    });
});