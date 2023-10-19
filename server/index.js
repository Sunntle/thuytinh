const express = require("express");
const cors = require("cors");
const app = express();
const initRoutes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/connectDatabase");
const { Server } = require("socket.io");
const { handleNewUserConnect, handleDisconnect, handleCallStaff } = require("./utils/socketHanlers")
const port = process.env.PORT || 8000;
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL, process.env.CLIENT_URL_TEST, process.env.ADMIN_URL_TEST],
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
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL, process.env.CLIENT_URL_TEST, process.env.ADMIN_URL_TEST],
    methods: ["GET", "POST"]
  }
})
global.__basedir = __dirname;
global._io = io;
io.of("/admin").on("connection", (socket) => {
  // handleNewUserConnect(socket)
  // handleCallStaff(socket)
  // handleDisconnect(socket)
});
initRoutes(app);
db.connectDatabase();




