const express = require("express");
const cors = require("cors");
const app = express();
const initRoutes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/connectDatabase");
const moment = require("moment");
const { Server } = require("socket.io");
const {
  handleNewUserConnect,
  handleDisconnect,
  handleCallStaff,
  handlePayInCash,
  handleUserDisconnect,
} = require("./utils/socketHanlers");
require("dotenv").config();
moment.tz.setDefault('Asia/Bangkok');
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      process.env.ADMIN_URL_TEST,
      process.env.CLIENT_URL_TEST,
      process.env.CLIENT_URL_PRODUCTION,
      process.env.ADMIN_URL_PRODUCTION,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.connectDatabase();
const server = app.listen(port, (req, res) => {
  console.log(`Connect port: ${port}`);
});
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      process.env.CLIENT_URL_PRODUCTION,
      process.env.ADMIN_URL_PRODUCTION,
    ],
    methods: ["GET", "POST"],
  },
});
global.__basedir = __dirname;
global._io = io;
io.of("/admin").on("connection", (socket) => {
  handleNewUserConnect(socket);
  handleDisconnect(socket);
});
io.of("/client").on("connection", (socket) => {
  handleCallStaff(socket);
  handlePayInCash(socket);
  handleUserDisconnect(socket)
});
initRoutes(app);
