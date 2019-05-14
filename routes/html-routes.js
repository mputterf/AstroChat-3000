var path = require("path");

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
        res.render("chat");
    });

    app.get("*", function (req, res) {
        res.render("404");
    });

}