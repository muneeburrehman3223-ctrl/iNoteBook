require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// CORS settings - Netlify frontend ko allow karne ke liye
app.use(cors({
    origin: "*", // Filhal sab allow kar diya hai taake error na aaye
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Check karne ke liye ke backend chal raha hai ya nahi
app.get("/", (req, res) => {
  res.send("Hello! iNotebook Backend is Live on Vercel.");
});

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// IMPORTANT FOR VERCEL
// Localhost pe chalane ke liye:
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`iNotebook backend listening at http://localhost:${port}`);
    });
}

// Vercel serverless environment ke liye export zaroori hai
module.exports = app;