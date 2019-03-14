import openSocket from "socket.io-client"; // ?
const socket = openSocket("http://localhost:5000"); // ?

function subToAction(cb) {
  socket.on("game action", action => cb(action));
  console.log("action subscribed");
}

export { subToAction };
