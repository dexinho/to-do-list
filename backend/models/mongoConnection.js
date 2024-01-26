const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://root:root@cluster0.mltyjxq.mongodb.net/";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
