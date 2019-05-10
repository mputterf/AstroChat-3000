var db = require("../models");

module.exports = function (app) {
    app.get("/api/posts", function (req, res) {

        console.log(db);
        console.log(db.Post);
        db.Post.findAll({}).then(function (data) {
            res.json(data);
        })
    });
};