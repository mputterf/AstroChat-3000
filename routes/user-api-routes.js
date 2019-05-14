var db = require("../models");

module.exports = function (app) {
    app.get("/api/users", function (req, res) {
        db.User.findAll({ include: [db.Post] }).then(function (data) {
            res.json(data);
        });
    });

    app.get("/api/users/:name", function (req, res) {
        db.User.findOne({
            where: {
                name: req.params.name
            },
            include: [db.Post]
        }).then(function (data) {
            res.json(data);
        });
    });

    app.post("/api/users", function (req, res) {
        db.User.create(req.body).then(function (data) {
            res.json(data);
        });
    });
}