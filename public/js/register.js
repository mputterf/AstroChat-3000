$(document).ready(function () {

    $("#register-button").on("click", newUser);

    function newUser(event) {
        event.preventDefault();

        var name = $("#username").val().trim();
        var password = $("#password").val().trim();

        $.get("/api/users/", function (data) {

            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (name.toLowerCase() == data[i].name.toLowerCase()) {
                        // console.log(data);
                        $("#username").val("");
                        $("#password").val("");
                        $("#errorDiv").text("Username already in use");
                        return;
                    }

                }
            }

            if (password.length === 0) {
                $("#password").val("");
                $("#errorDiv").text("Password cannot be empty");
                return;
            }

            var newUser = {
                name: name,
                passwd: password
            }
            $.post("/api/users", newUser, function (data) {
                window.location.href = "/chat?userid=" + data.id;
            });


        });
    }

});