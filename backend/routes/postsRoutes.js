const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// dummy post storage (for now)
let posts = [
  { id: 1, title: "Admin Post", authorRole: "Admin" },
  { id: 2, title: "Editor Post", authorRole: "Editor" }
];

// READ - any logged-in user
router.get("/", verifyToken, (req, res) => {
  res.json(posts);
});

// CREATE - Admin and Editor only
router.post("/", verifyToken, authorizeRoles("Admin", "Editor"), (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    authorRole: req.user.role,
  };
  posts.push(newPost);
  res.status(201).json({ message: "Post created successfully!", post: newPost });
});

// DELETE - Admin only
router.delete("/:id", verifyToken, authorizeRoles("Admin"), (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id);
  res.json({ message: "Post deleted successfully!" });
});

module.exports = router;
