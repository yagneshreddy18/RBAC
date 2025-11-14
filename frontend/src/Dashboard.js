import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!token) navigate("/");
    decodeToken();
    fetchPosts();
  }, []);

  const decodeToken = () => {
    try {
      const tokenParts = JSON.parse(atob(token.split(".")[1]));
      setUserId(tokenParts.id);
    } catch (err) {
      console.error("Failed to decode token");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://rbac-backend-vi2k.onrender.com/api/posts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch posts.");
    }
  };

  const createPost = async () => {
    if (!newTitle.trim()) return alert("Enter title");
    setLoading(true);
    try {
      await axios.post(
        "https://rbac-backend-vi2k.onrender.com/api/posts",
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTitle("");
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("You do not have permission to create posts.");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axios.delete(
        `https://rbac-backend-vi2k.onrender.com/api/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPosts();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "You do not have permission to delete posts."
      );
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="app-shell">
      <div className="header">
        <div>
          <div className="title">Dashboard</div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            Manage posts
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="role-badge">{role || "Guest"}</div>
          <button className="btn ghost" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        {role !== "Viewer" ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              className="input"
              placeholder="New post title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button className="btn" onClick={createPost} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        ) : (
          <div style={{ color: "var(--muted)" }}>
            You have read-only access.
          </div>
        )}

        <div className="posts-grid">
          {posts.length === 0 && (
            <div style={{ color: "var(--muted)", padding: 12 }}>
              No posts yet
            </div>
          )}

          {posts.map((p) => (
            <div className="post" key={p.id}>
              <h4>{p.title}</h4>
              <small>By: {p.authorRole || "unknown"}</small>

              <div className="controls">
                {(role === "Admin" ||
                  (role === "Editor" && p.authorId === userId)) ? (
                  <button className="btn" onClick={() => deletePost(p.id)}>
                    Delete
                  </button>
                ) : (
                  <button
                    className="btn secondary"
                    disabled
                    title="No permission to delete"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
