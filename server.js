const express = require("express");
// const mongoose = require("mongoose");
// const score = require("./routes/api/score");
// const users = require("./routes/api/users");
// const bodyParser = require("body-parser");
const app = express();

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

// app.get("/", (req, res) => res.send("Hello"));

const gameboard = {};

app.get("/", (req, res) => {
  // res.send("<h1>Hello world</h1>");
  res.sendFile(__dirname + "/index.html");
});

// Set up socket.io action
io.on("connection", function(socket) {
  console.log("a user connected");
  // socket.on("chat message", function(msg) {
  //   io.emit("chat message", msg);
  //   console.log("message: " + msg);
  // });
  socket.on("dice action", (player, dice) => {
    // console.log("Dice:", player, dice);
    gameboard.player = dice;
    console.log("recorded", player, gameboard.player);
  });
  socket.on("game action", action => {
    console.log("game action: ", action);
  });
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(5000, function() {
  console.log("listening on *:5000");
});

// app.use("/api/score", score);
// app.use("/api/users", users);

// Test websocket
// app.ws("/echo", (ws, req) => {
//   ws.on("message", msg => ws.send(msg));
//   console.log("socket", req.testing);
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server running on port ${port}`));
