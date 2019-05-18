
var db = require("../models");
var moment = require("moment");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/login", function (req, res) {
        res.render("login");
    });

    app.get("/register", function (req, res) {
        res.render("register");
    });

    app.get("/chat", function (req, res) {

        db.Post.findAll({ include: [db.User] }).then(function (data) {

            // console.log(data[0].dataValues)


            for (var i = 0; i < data.length; i++) {
                data[i].dataValues.createdAt = moment(data[i].dataValues.createdAt).tz(moment.tz.guess()).format('ddd MMMM Do YYYY, h:mm a');

            }

            console.log(data);
            res.render("chat", { posts: data });

        })



    });

    app.get("*", function (req, res) {
        res.render("404");
    });

}