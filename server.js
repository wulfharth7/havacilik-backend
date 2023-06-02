const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes") 
require('dotenv').config();
var cors = require('cors');

const app = express();  
app.use(express.json());
const uri = process.env.DB_CONNECT

mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(cors({
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE',
  allowedHeaders: '*'
}));

app.use(Router);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
});