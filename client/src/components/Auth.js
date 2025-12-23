import React from 'react';

const Auth = ({ 
  username, setUsername, 
  password, setPassword, 
  isRegistering, setIsRegistering, 
  handleLogin, handleRegister, 
  authMsg, setAuthMsg 
}) => {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#333" }}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center", width: "300px" }}>
        <h1>{isRegistering ? "📝Student Sign Up" : "🔐Canteen Login"}</h1>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ display: "block", width: "90%", padding: "10px", margin: "10px auto" }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: "block", width: "90%", padding: "10px", margin: "10px auto" }} />
        
        {isRegistering ? 
          <button onClick={handleRegister} style={{ width: "100%", padding: "10px", backgroundColor: "#6AECE1", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}>Register</button>
          : 
          <button onClick={handleLogin} style={{ width: "100%", padding: "10px", backgroundColor: "#26CCC2", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}>Login</button>
        }
        
        {authMsg && <p style={{ color: authMsg.includes("Success") ? "green" : "red" }}>{authMsg}</p>}
        
        <p style={{weight:"bold", fontSize: "0.9em", color: "#1da097ff", marginTop: "20px", cursor: "pointer", textDecoration: "none" }} onClick={() => { setIsRegistering(!isRegistering); setAuthMsg(""); }}>
          {isRegistering ? "Back to Login" : "New Student? Register here"}
        </p>
      </div>
    </div>
  );
};

export default Auth;