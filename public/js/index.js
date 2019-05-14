$(document).ready(function () {

    // console.log("js loaded");

    // At first no user will be signed in, so their ID will be null
    var userID = null;

    var userPost = $("#message");

    // sign in message that will be in place of the chat box form until the user signs in
    var signInMessage = $("<div>");
    signInMessage.attr("id", "signInMessage");
    signInMessage.html("<p>Please sign in before sending any messages</p>");
    $("#sendMessageDiv").append(signInMessage);

    // When the user logs in, fire the function to get their User ID
    $("#sign-in-button").on("click", getUser);

    // Get the user to sign in first
    if (userID === null) {
        $("#sendMessage").hide();
    }

    // When the user clicks the send message, fire the function to post the message to the db
    $("#sumbit-button").on("click", postMessage);

    function getUser(event) {
        event.preventDefault();

        // get the name the user entered
        var name = $("#username").val().trim().toLowerCase();

        // We'll get the password too
        // We'll compare the password to what's in the database. If it's a match, get the user's ID

        // We'll look for the user in the db and save their id (will be useful for posting messages to the db)
        $.get("/api/users/" + name, function (data) {

            if (data) {
                userID = data.id;
                // console.log("userID", userID);

                // Remove the sign in message and show the chatbox
                $("#signInMessage").remove();
                $("#sendMessage").show();

                // Since the user is logged in now, we'll replace the login form with a welcome message
                $("#join").html("<p>Welcome " + data.name + "!</p>");
            }
            // else alert user not found

        });
    }

    // Handles sending messages to the db
    function postMessage(event) {
        event.preventDefault();

        var message = {
            textInput: userPost.val().trim(),
            UserID: userID
        };

        console.log(message);
    }

});
