const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: ["http://localhost:5000","http://localhost:3000"] }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5000","http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("hello",arg=>{
    console.log(arg);
  })
  socket.emit("new user", socket.id)
});
httpServer.listen(8080, () => {
  console.log('Server is running on port 8080');
});
