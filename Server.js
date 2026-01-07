const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  socket.on("joinRoom", room => socket.join(room));
  socket.on("msg", data => io.to(data.room).emit("msg", data));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("TykOS server running"));