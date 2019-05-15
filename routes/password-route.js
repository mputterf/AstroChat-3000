var db = require("../models");

module.exports = function (app) {
    app.post("/api/users/passwords", function (req, res) {
        db.Password.create(req.body).then(function (data) {
            console.log("Added password");
        })
    });
};

