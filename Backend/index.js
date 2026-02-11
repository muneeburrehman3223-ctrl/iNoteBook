require("dotenv").config(); // Load .env variables for local testing
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000; // Render will provide PORT automatically

app.use(cors());
app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
// app.use("/api/users", require("./routes/user"));

// Root route (optional)
app.get("/", (req, res) => {
  res.send("iNotebook Backend is running");
});

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
