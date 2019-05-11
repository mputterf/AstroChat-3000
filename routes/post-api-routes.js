var db = require("../models");

module.exports = function (app) {
    app.get("/api/posts", function (req, res) {

        db.Post.findAll({}).then(function (data) {
            res.json(data);
        })
    });

    app.post("/api/posts", function (req, res) {
        // console.log("req.body: ", req.body);
        // console.log("params: ", req.params);

        db.Post.create(req.body).then(function (data) {
            res.json(data);
        });
    });
};