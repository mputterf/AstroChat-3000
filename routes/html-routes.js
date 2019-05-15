
var db = require("../models");

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
        
            db.Post.findAll({}).then(function (data) {
                res.render("chat", {posts: data});
            })
        
        

    });

    app.get("*", function (req, res) {
        res.render("404");
    });

}