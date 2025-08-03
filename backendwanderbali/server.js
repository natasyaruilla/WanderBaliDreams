require("dotenv").config();  
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  highlight: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

app.get("/api/destinations", (req, res) => {
  const filePath = path.join(__dirname, "data", "destinations.json");  
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data." });
    try {
      const destinations = JSON.parse(data);
      res.json(destinations); 
    } catch (e) {
      res.status(500).json({ error: "Error parsing destinations data." });
    }
  });
});

app.get("/api/destinations/:id", (req, res) => {
  const { id } = req.params;  
  const filePath = path.join(__dirname, "data", "destinations.json");  

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data." });

    try {
      const destinations = JSON.parse(data);
      const place = destinations.find((destination) => destination.id === String(id));  

      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }

      res.json(place);  
    } catch (e) {
      res.status(500).json({ error: "Error parsing destinations data." });
    }
  });
});


app.post("/api/reviews", async (req, res) => {
  try {
    const { name, highlight, comment } = req.body;

    if (!name || !highlight || !comment) {
      return res.status(400).json({ error: "Name, highlight, and comment are required." });
    }

    const review = new Review({
      name,
      highlight,
      comment,
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);  
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ error: "Failed to save review." });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews); 
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
