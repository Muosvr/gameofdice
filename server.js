const express = require("express");
// const mongoose = require("mongoose");
// const score = require("./routes/api/score");
// const users = require("./routes/api/users");
// const bodyParser = require("body-parser");
const app = express();
const path = require("path");

// Add websocket
// var expressWs = require("express-ws")(app);
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// DB Config
// const db = require("./config/dev_keys").mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

var gameboard = {};
var players = [];

// app.get("/", (req, res) => {
// res.send("<h1>Hello world</h1>");
//   res.sendFile(__dirname + "/index.html");
// });

// Set up socket.io action
io.on("connection", function(socket) {
  console.log("a user connected");
  var playerName;
  socket.on("dice action", (player, dice) => {
    // console.log("Dice:", player, dice);
    playerName = player;
    gameboard[player] = dice;
    io.emit("player rolled", player);
    console.log("recorded", player, gameboard[player]);
  });

  // on receiving game actiono, emit to everyone including the sender
  socket.on("game action", action => {
    console.log("game action: ", action);
    if (action === "reveal") {
      io.emit("reveal score", gameboard);
      gameboard = {};
    }
  });

  // Detect player login
  socket.on("new player", player => {
    console.log("new player", player);
    players.push(player);
    io.emit("new player", players);
  });

  socket.on("disconnect", function() {
    io.emit("player left", playerName);
    console.log(playerName, "disconnected");
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

http.listen(port, function() {
  console.log(`listening on port: ${port}`);
});
