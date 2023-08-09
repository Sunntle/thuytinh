const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const db = require("./config/connectDatabase");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
db.connectDatabase();
const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
  console.log(`Connect port: ${port}`);
});
