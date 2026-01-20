import React, { useContext, useState } from "react";
import { CanteenContext } from "../context/CanteenContext";
import "./StudentDashboard.css";

const categories = ["All", "Breakfast", "Lunch", "Snacks"];

const StudentDashboard = () => {
  const { menu = [], orders = [], setOrders = () => {} } =
    useContext(CanteenContext) || {};

  const [activeCat, setActiveCat] = useState("All");
  const [cart, setCart] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const filteredMenu =
    activeCat === "All"
      ? menu
      : menu.filter(item => item.category === activeCat);

  const addToCart = item => {
    setCart(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) {
        return prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );


  const placeOrder = () => {
    if (!cart.length) return alert("Cart is empty");

    const newOrders = cart.map(item => ({
      id: Date.now() + Math.random(),
      item: item.name,
      qty: item.qty,
      status: "Preparing"
    }));

    setOrders([...orders, ...newOrders]);
    alert("Order placed successfully");
    setCart([]);
  };

  const handleFeedbackSubmit = () => {
  if (rating === 0) {
    alert("Please select a rating");
    return;
  }

  if (feedback.trim() === "") {
    alert("Please write feedback");
    return;
  }

  console.log("Feedback submitted:");
  console.log("Rating:", rating);
  console.log("Feedback:", feedback);

  alert("Thank you for your feedback!");

  // reset after submit
  setRating(0);
  setFeedback("");
};

  return (
    <div className="student-container">
      {/* HEADER */}
      <header className="student-header">
        <h1>🍽 Campus Canteen</h1>
        <button
          className="logout-btn"
          onClick={() => (window.location.href = "/")}
        >
          Logout
        </button>
      </header>

      {/* CATEGORY */}
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={cat === activeCat ? "active" : ""}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU */}
      <section className="menu-section">
        <h2 className="section-title">🍕 Menu</h2>
        <div className="menu-grid">
          {filteredMenu.map(item => (
            <div className="food-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="food-info">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
                <button onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART + ORDERS */}
      <section className="bottom-grid">
        <div className="box">
          <h2>🛒 Cart</h2>
          {cart.length === 0 && <p>No items in cart</p>}
          {cart.map((item, i) => (
            <p key={i}>
              {item.name} × {item.qty}
            </p>
          ))}
          <h3>Total: ₹{total}</h3>
          <button className="primary-btn" onClick={placeOrder}>
            Pay & Order
          </button>
        </div>

        <div className="box">
          <h2>📦 Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map(order => (
              <p key={order.id}>
                {order.item} ({order.qty}){" "}
                <span className="badge">{order.status}</span>
              </p>
            ))
          )}
        </div>

        <div className="box">
  <h2>⭐ Feedback</h2>

  <div className="stars">
    {[1, 2, 3, 4, 5].map(n => (
      <span
        key={n}
        className={n <= rating ? "star active" : "star"}
        onClick={() => setRating(n)}
      >
        ★
      </span>
    ))}
  </div>

  <textarea
    placeholder="Write feedback..."
    value={feedback}
    onChange={e => setFeedback(e.target.value)}
  />

  <button className="primary-btn" onClick={handleFeedbackSubmit}>
    Submit
  </button>
</div>
      </section>
    </div>
  );
};

export default StudentDashboard;