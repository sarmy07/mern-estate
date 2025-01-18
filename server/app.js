const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");

const port = process.env.PORT || 3000;
const mongo_url = `${process.env.mongo_uri}`;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

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
