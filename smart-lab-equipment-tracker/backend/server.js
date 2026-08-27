
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const equipmentRoutes = require("./routes/equipmentRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/equipment", equipmentRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed");
    console.log(error.message);
  });

app.get("/", (req, res) => {
  res.send("Smart Lab Equipment Tracker Backend is Running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});