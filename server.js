const express = require("express");
const mongoose = require("mongoose");
const score = require("./routes/api/score");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const app = express();

// Add websocket
var expressWs = require("express-ws")(app);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/dev_keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

app.use("/api/score", score);
app.use("/api/users", users);

// Test websocket
app.ws("/echo", (ws, req) => {
  ws.on("message", msg => ws.send(msg));
  console.log("socket", req.testing);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
