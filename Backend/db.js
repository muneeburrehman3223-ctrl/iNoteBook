const mongoose = require("mongoose");

// Use environment variable for MongoDB URI
// Local ke liye fallback
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; // Compass se connect ho raha


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo Successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

module.exports = connectToMongo;
