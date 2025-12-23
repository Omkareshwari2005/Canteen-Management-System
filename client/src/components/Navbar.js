import React from 'react';

const Navbar = ({ user, activeTab, setActiveTab, handleLogout }) => {
  return (
    <header style={{ backgroundColor: user.role === 'admin' ? "#8CA9FF" : "#8CA9FF", color: "#fff", padding: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ margin: 0 }}>{user.role === 'admin' ? "Kitchen Dashboard" : "Student Canteen"}</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {user.role === 'student' ? (
          <>
            <button onClick={() => setActiveTab("home")} style={{ opacity: activeTab === "home" ? 1 : 0.7, background: "none", border: "1px solid white", color: "white", padding: "8px 15px", cursor: "pointer", borderRadius: "5px" }}>Menu</button>
            <button onClick={() => setActiveTab("history")} style={{ opacity: activeTab === "history" ? 1 : 0.7, background: "none", border: "1px solid white", color: "white", padding: "8px 15px", cursor: "pointer", borderRadius: "5px" }}>My Orders</button>
          </>
        ) : (
          <>
            <button onClick={() => setActiveTab("pending")} style={{ opacity: activeTab === "pending" ? 1 : 0.7, background: "none", border: "1px solid white", color: "white", padding: "8px 15px", cursor: "pointer", borderRadius: "5px" }}>🕒 Pending</button>
            <button onClick={() => setActiveTab("completed")} style={{ opacity: activeTab === "completed" ? 1 : 0.7, background: "none", border: "1px solid white", color: "white", padding: "8px 15px", cursor: "pointer", borderRadius: "5px" }}>✅ Completed</button>
            <button onClick={() => setActiveTab("manage_menu")} style={{ opacity: activeTab === "manage_menu" ? 1 : 0.7, backgroundColor: "white", color: "#8CA9FF", border: "none", padding: "8px 15px", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}>📝 Manage Menu</button>
          </>
        )}
        <button onClick={handleLogout} style={{ backgroundColor: "#436ff2ff", color: "white", border: "none", padding: "8px 15px", cursor: "pointer", borderRadius: "5px", marginLeft: "10px" }}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;