import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Login failed! Check server or credentials.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="card" style={{ maxWidth:420, margin:"36px auto" }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div className="title">Role-Based Access Control</div>
          <div style={{ color: "var(--muted)", marginTop:6 }}>Sign in to continue</div>
        </div>

        <form className="form-center" onSubmit={handleLogin}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => { setEmail("viewer@example.com"); setPassword("viewer123"); }}
            >
              Quick Viewer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
