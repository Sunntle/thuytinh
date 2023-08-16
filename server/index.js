const express = require("express");
const cors = require("cors");
const app = express();
const initRoutes = require('./routes');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const db = require("./config/connectDatabase");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRoutes(app);
db.connectDatabase();


const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
  console.log(`Connect port: ${port}`);
});
