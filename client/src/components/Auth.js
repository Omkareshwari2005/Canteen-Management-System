import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate= useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Login Successful 🎉");
        if(data.user.role === "student") {
          navigate("/student");
        }
        else if(data.user.role === "chef")
        {
          navigate("/chef");
        }
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: "url('/images/canteen-bg.jpg')" }}
    >
      <div className="auth-card">
        <h2 className="auth-title">College Canteen</h2>

        <div className="role-buttons">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={role === "chef" ? "active" : ""}
            onClick={() => setRole("chef")}
          >
            Chef
          </button>
        </div>

        <input
          className="auth-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* THIS IS REQUIRED */}
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Auth;