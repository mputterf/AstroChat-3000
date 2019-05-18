

// $(function () {
$(document).ready(function () {

    var userName;

    var socket = io();
    // Get the message the user entered and send it to the server and databse
    $.get("/api/users", function (data) {
        var userID = parseInt(getUrlParameter("userid"));
        for (var i = 0; i < data.length; i++) {
            if (userID == data[i].id) {
                // console.log(data[i].name)
                userName = data[i].name;
                socket.emit("newUser", userName);
            }
        };
    });

    socket.on("newUser", function (newUser) {
        $("#onlineUsers").html(newUser);
    });

    // socket.on("disconnect", function (newUser) {
    //     $("#onlineUsers").html(newUser);
    // })

    $('form').submit(function (e) {
        var userID = parseInt(getUrlParameter("userid"));
        e.preventDefault(); // prevents page reloading
        var message = $('#message-box').val();

        socket.emit('chat message', message);


        // console.log("Message: ", message);

        // Create message object for sending to database
        var userPost = {
            textInput: message,
            UserId: userID
        };

        // post route for sending message to database
        $.post("/api/posts", userPost, function () {
            console.log("Message sent to db");
        });

        // clear message box after we send everything
        $('#message-box').val('');

        return false;
    });

    // When we get a message from the server, append it to the chatbox
    socket.on('chat message', function (msg) {
        $('#messageList').append($('<li>').html(msg + "<br>" + userName));
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
});