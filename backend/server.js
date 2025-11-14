const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postsRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Connect to MongoDB (only once)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("RBAC Backend working and MongoDB connected!");
});

// Use ENV Port for deployment
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
