var db = require("../models");

module.exports = function (app) {
    app.post("/api/users/passwords", function (req, res) {
        db.Password.create(req.body).then(function (data) {

            var result = {
                result: "Failure"
            }

            // If it's not entered into the database, send back error
            if (data.changedRows == 0) {
                res.json(result);
                res.status(500).end();
                console.log("Failed to add password");
            } else {
                // If successful, send back success
                result.result = "Success";
                res.json(result);
                res.status(200).end();
                console.log("Added password");
            }
        });
    });
};

