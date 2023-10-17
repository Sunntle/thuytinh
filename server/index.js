const express = require("express");
const cors = require("cors");
const app = express();
const initRoutes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/connectDatabase");
const { Server } = require("socket.io");
const { handleNewUserConnect, handleDisconnect } = require("./utils/socketHanlers")
const port = process.env.PORT || 8000;
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
const server = app.listen(port, (req, res) => {
  console.log(`Connect port: ${port}`);
});


const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    methods: ["GET", "POST"]
  }
})
global.__basedir = __dirname;
global._io = io;
let userConnected = [];
let storeMessage = [];
const listPermission = ['R2', 'R3', 'R4'];
// io.on("connection", (socket) => {
//   handleNewUserConnect(socket, userConnected, storeMessage, listPermission)
//   handleDisconnect(socket, userConnected, storeMessage, listPermission)
// });
initRoutes(app);
db.connectDatabase();




