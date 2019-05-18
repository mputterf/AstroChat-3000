require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var moment = require("moment");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var server = require("http").createServer(app);
var io = require("socket.io")(server);


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/post-api-routes")(app);
require("./routes/user-api-routes")(app);
require("./routes/html-routes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  server.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// socket.io
// When a user connects to the server (chatroom)
io.on('connection', function (client) {
  console.log('Client connected...');

  // When a user disconnects
  client.on("disconnect", function () {
    console.log("Client disconnected...")
  });

  // When a user sends a chat message, it will come into the server
  client.on('chat message', function (msg) {
    // console.log('message: ' + msg);

    // We'll send the chat message to every user
    io.emit('chat message', msg + "<br>" + moment().format('ddd MMMM Do YYYY, h:mm a'));

  });
});

module.exports = app;
