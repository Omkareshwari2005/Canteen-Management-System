import React, { useState, useContext } from "react";
import { CanteenContext } from "../context/CanteenContext";
import { useNavigate } from "react-router-dom";

const ChefDashboard = () => {
  const navigate = useNavigate();

  const {
    menu = [],
    orders = [],
    setOrders,
    addMenuItem,
    deleteMenuItem,
    toggleAvailable
  } = useContext(CanteenContext);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "Breakfast",
    image: ""
  });

  const markReady = (id) => {
    setOrders(
      orders.map(order =>
        order.id === id ? { ...order, status: "Ready" } : order
      )
    );
  };

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={topBar}>
        <h1>👨‍🍳 Chef Dashboard</h1>
        <button onClick={() => navigate("/")} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* ORDERS */}
      <section style={glassSection}>
        <h2>📦 Incoming Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <div style={orderGrid}>
            {orders.map(order => (
              <div key={order.id} style={glassCard}>
                <p><b>ID:</b> {order.id}</p>
                <p><b>Status:</b> {order.status}</p>

                <ul>
                  {order.items?.map((item, i) => (
                    <li key={i}>{item.name} × {item.qty}</li>
                  ))}
                </ul>

                {order.status === "Preparing" && (
                  <button
                    style={readyBtn}
                    onClick={() => markReady(order.id)}
                  >
                    Mark Ready
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ADD ITEM */}
      <section style={glassSection}>
        <h2>➕ Add Menu Item</h2>

        <div style={form}>
          <input
            style={input}
            placeholder="Food Name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          />

          <input
            style={input}
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={e => setNewItem({ ...newItem, price: e.target.value })}
          />

          <select
            style={input}
            value={newItem.category}
            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Snacks</option>
            <option>Dinner</option>
          </select>

          <input
            style={input}
            placeholder="Image URL"
            value={newItem.image}
            onChange={e => setNewItem({ ...newItem, image: e.target.value })}
          />

          <button
            style={btn}
            onClick={() =>
              addMenuItem({
                ...newItem,
                id: Date.now(),
                price: Number(newItem.price),
                available: true
              })
            }
          >
            Add Item
          </button>
        </div>
      </section>

      {/* MENU */}
      <section style={glassSection}>
        <h2>🍽 Menu Items</h2>

        {/* 🔥 FIXED 4 ITEMS PER ROW */}
        <div style={menuGrid}>
          {menu.map(item => (
            <div key={item.id} style={menuCard}>
              <img src={item.image} alt={item.name} style={img} />

              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p>{item.category}</p>

              <span
                style={{
                  color: item.available ? "#00b894" : "#d63031",
                  fontWeight: "bold"
                }}
              >
                {item.available ? "Ready to Serve" : "Not Available"}
              </span>

              <div style={btnGroup}>
                <button
                  style={toggleBtn}
                  onClick={() => toggleAvailable(item.id)}
                >
                  Toggle
                </button>
                <button
                  style={delBtn}
                  onClick={() => deleteMenuItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  padding: 20,
  backgroundImage:
    "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
  background: "rgba(0,0,0,0.6)",
  color: "white",
  borderRadius: 12,
  marginBottom: 20,
  backdropFilter: "blur(8px)"
};

const logoutBtn = {
  background: "#dc3545",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6
};

const glassSection = {
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(10px)",
  padding: 20,
  borderRadius: 16,
  marginBottom: 25
};

const form = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 10
};

const input = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc"
};

const btn = {
  gridColumn: "1 / -1",
  background: "green",
  color: "white",
  border: "none",
  padding: 12,
  borderRadius: 8
};

/* 🔥 CORRECTION: FORCE 4 ITEMS PER ROW */
const menuGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 20
};

const menuCard = {
  background: "rgba(255,255,255,0.85)",
  borderRadius: 14,
  padding: 15,
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,.15)"
};

const img = {
  width: "100%",
  height: 140,
  objectFit: "cover",
  borderRadius: 10
};

const btnGroup = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 10
};

const toggleBtn = {
  background: "#0d6efd",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6
};

const delBtn = {
  background: "#dc3545",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6
};

const orderGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 15
};

const glassCard = {
  background: "rgba(255,255,255,0.85)",
  padding: 15,
  borderRadius: 14
};

const readyBtn = {
  background: "orange",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  marginTop: 8
};

export default ChefDashboard;