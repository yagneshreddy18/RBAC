const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// Temporary post storage (in-memory array)
let posts = [
  { id: 1, title: "Admin Post", authorRole: "Admin", authorId: "1" },
  { id: 2, title: "Editor Post", authorRole: "Editor", authorId: "2" }
];

// READ - Any logged-in user
router.get("/", verifyToken, (req, res) => {
  res.json(posts);
});

// CREATE - Admin and Editor only
router.post("/", verifyToken, authorizeRoles("Admin", "Editor"), (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    authorRole: req.user.role,
    authorId: req.user.id, // logged-in user’s ID from token
  };
  posts.push(newPost);
  res.status(201).json({ message: "Post created successfully!", post: newPost });
});

// DELETE - Admin can delete any post, Editor only their own
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Editor"), (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // If Editor, ensure they can delete only their own post
  if (req.user.role === "Editor" && post.authorId !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to delete this post" });
  }

  posts = posts.filter((p) => p.id !== postId);
  res.json({ message: "Post deleted successfully!" });
});

module.exports = router;
