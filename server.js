const express = require("express");
const app = express();
const path = require("path");

// Add websocket
// var expressWs = require("express-ws")(app);
const http = require("http").Server(app);
const io = require("socket.io")(http);


var gameboard = {};
var players = [];


// Set up socket.io action
io.on("connection", function (socket) {

  // Notify send over socket identifying info and notify other players
  console.log("user id: " + socket.id + " connected");
  io.to(socket.id).emit("id assignment", socket.id);
  io.emit("new player", players);

  // Detect player login
  socket.on("new player", playerName => {
    const player = {
      name: playerName,
      id: socket.id
    }
    console.log("new player", player);
    players.push(player);
    io.emit("new player", players);
  });

  // Detect dice roll
  socket.on("dice action", (playerId, dice) => {
    const playerName = players[players.findIndex(obj => obj.id == socket.id)].name;

    // initialize player to grameboard
    if (!gameboard[playerId]) {
      console.log("create new player in gameboard");
      gameboard[playerId] = {
        name: playerName,
        id: playerId,
      }
    }
    gameboard[playerId] = { ...gameboard[playerId], dice }
    io.emit("player rolled", playerName);

    console.log("recorded", playerName, playerId, gameboard[playerId].dice);
  });

  // On receiving game action, emit to everyone including the sender
  socket.on("game action", action => {
    console.log("game action: ", action);
    if (action === "reveal") {
      io.emit("reveal score", gameboard);
      gameboard = {};
    }
  });



  socket.on("disconnect", function () {
    const playerIndex = players.findIndex(player => player.id === socket.id);
    delete gameboard[socket.id];

    if (playerIndex != -1) {
      console.log("playerIndex", playerIndex);
      const playerName = players[playerIndex].name;
      players.splice(playerIndex, 1);
      io.emit("player left", players);
      console.log(playerName, socket.id, "disconnected");
    }

  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

http.listen(port, function () {
  console.log(`listening on port: ${port}`);
});
