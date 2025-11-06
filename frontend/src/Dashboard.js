import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch {
      alert("Failed to fetch posts.");
    }
  };

  const createPost = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/posts",
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post created!");
      fetchPosts();
    } catch {
      alert("You do not have permission to create posts.");
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post deleted!");
      fetchPosts();
    } catch {
      alert("You do not have permission to delete posts.");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome, {role}</h2>
      <button onClick={logout}>Logout</button>

      <br /><br />

      {role !== "Viewer" && (
        <div>
          <input
            placeholder="New post title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ padding: "8px", width: "200px" }}
          />
          <button onClick={createPost} style={{ padding: "8px 16px" }}>
            Create Post
          </button>
        </div>
      )}

      <h3>All Posts:</h3>
      <ul style={{ listStyle: "none" }}>
        {posts.map((p) => (
          <li key={p.id}>
            {p.title} ({p.authorRole})
            {role === "Admin" && (
              <button
                onClick={() => deletePost(p.id)}
                style={{ marginLeft: "10px", padding: "4px 8px" }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
