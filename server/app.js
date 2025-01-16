const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const mongo_url = `${process.env.mongo_uri}`;


const connect = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("connected to mongodb");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("could not connect to mongodb because...");
    console.log(error);
  }
};

connect();
