$(document).ready(function () {

    // var userID = null;

    // When the user logs in, fire the function to get their User ID
    $("#sign-in-button").on("click", getUser);

    function getUser(event) {
        event.preventDefault();

        // get the name the user entered
        var name = $("#username").val().trim();
        var password = $("#password").val().trim();
        // console.log("Entered pass", password);

        // We'll get the password too
        // We'll compare the password to what's in the database. If it's a match, get the user's ID

        // We'll look for the user in the db and save their id (will be useful for posting messages to the db)
        $.get("/api/users/" + name, function (data) {

            if (data) {
                userID = data.id;
                console.log("userID", userID);

                var comparePasswords = {
                    enteredPasswd: password
                };

                $.post("/api/users/passwords/" + userID, comparePasswords, function (data) {
                    console.log(data);
                });
            }
            // else alert user not found

        });
    }

});