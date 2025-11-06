const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postsRoutes"); // ✅

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes); // ✅

app.get("/", (req, res) => {
  res.send("RBAC Backend working and MongoDB connected!");
});

app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000"));
