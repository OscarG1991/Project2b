// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var app = express();
var http = require("http").Server(app);

// Sets up the Express App
// =============================================================

var io = require("socket.io")(http);
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync().then(function() {
  http.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

