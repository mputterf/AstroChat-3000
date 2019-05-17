var db = require("../models");

module.exports = function (app) {
    // For adding passwords to the db
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

    // for signing in
    app.post("/api/users/passwords/:id", function (req, res) {
        db.Password.findOne({
            where: {
                UserId: req.params.id
            }

        }).then(function (data) {
            // res.json(data);

            // console.log("from front end", req.body.enteredPasswd);
            // console.log("from db", data.passwd);
            if (req.body.enteredPasswd == data.passwd) {
                res.json(data.UserId);
                // res.render("chat", { user: data.UserId });
            } else {
                res.json("Failed");
            }
        });
    });
};

