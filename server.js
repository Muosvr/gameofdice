const express = require("express");
const app = express();
const path = require("path");
const socketLogics = require("./socket/socketLogics");

socketLogics(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
