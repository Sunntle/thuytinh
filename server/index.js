const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const app = express();
const initRoutes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/connectDatabase");
const { Server } = require("socket.io");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const httpServer = createServer(app);
const io = new Server(httpServer,{cors: {
  origin: ["http://localhost:5000","http://localhost:3000"],
  methods: ["GET", "POST"]
}})
let userConnected =  [];
let storeMessage = [];
const listPermission = ['R2', 'R3', 'R4'];
io.on("connection", (socket) => {
  socket.on("new user",(user)=>{
    userConnected.push({socketId: socket.id, role: user.role})
    if(listPermission.includes(user.role)) {
      storeMessage.length > 0 && socket.emit("new message", storeMessage)
    }
  })
  socket.on("new order",arg=>{
    if(userConnected.some((el) => el.role === "R4")) {
      socket.broadcast.emit("new message", arg)
    }else { 
      storeMessage.unshift(arg)
    }
  })
  socket.on("disconnect", () => {
    if(userConnected.some(el => el.socketId == socket.id && listPermission.includes(el.role))){
      storeMessage = []
    }
    userConnected = [...userConnected.filter(el=> el.socketId !== socket.id)]
  });
});
initRoutes(app);
db.connectDatabase();

const port = process.env.PORT || 8000;
httpServer.listen(port, (req, res) => {
  console.log(`Connect port: ${port}`);
});
