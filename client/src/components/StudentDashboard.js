import React from 'react';

const StudentDashboard = ({ 
  activeTab, filteredMenu, cart, addToCart, 
  placeOrder, myOrders, cancelOrder, 
  category, setCategory, setSearch, msg 
}) => {
  
  return (
    <div style={{ padding: "20px" }}>
      {/* MENU TAB */}
      {activeTab === 'home' && (
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 3 }}>
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              <input placeholder="Search food..." style={{ padding: "7px", borderRadius: "2px", border: "0.4px solid #ccc" }} onChange={(e) => setSearch(e.target.value)} />
              {["All", "Snacks", "Lunch", "Drinks"].map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} style={{ padding: "10px", backgroundColor: category === cat ? "#b1c9f5ff" : "#ddd", color: category === cat ? "#fff" : "#000", border: "none", borderRadius: "5px", cursor: "pointer" }}>{cat}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
              {filteredMenu.map(item => (
                <div key={item._id} style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <b>₹{item.price}</b>
                    <button onClick={() => addToCart(item)} style={{ backgroundColor: "#9BEC00", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: "white", padding: "20px", borderRadius: "10px", height: "fit-content" }}>
            <h2>My Cart</h2>
            {cart.length === 0 ? <p style={{ color: "#999" }}>Cart is empty</p> : cart.map((item, i) => <div key={i} style={{ borderBottom: "1px solid #eee", padding: "5px" }}>{item.name} - ₹{item.price}</div>)}
            <h3>Total: ₹{cart.reduce((sum, i) => sum + i.price, 0)}</h3>
            <button onClick={placeOrder} disabled={cart.length === 0} style={{ width: "100%", padding: "10px", backgroundColor: "#9BEC00", color: "white", border: "none", cursor: cart.length === 0 ? "not-allowed" : "pointer" }}>Place Order</button>
            {msg && <p style={{ color: "green", fontWeight: "bold" }}>{msg}</p>}
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2>My Order History</h2>
          {myOrders.length === 0 ? <p>No past orders.</p> : myOrders.map(order => (
            <div key={order._id} style={{ backgroundColor: "white", marginBottom: "15px", padding: "20px", borderRadius: "10px", borderLeft: order.status === "Pending" ? "5px solid orange" : "5px solid #9BEC00" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <div>
                  <h3>Order #{order._id.slice(-4)}</h3>
                  <span style={{ fontWeight: "bold", color: order.status === "Pending" ? "orange" : "#9BEC00" }}>{order.status === "Pending" ? "🕒 Pending" : "✅ Ready!"}</span>
                </div>
                {order.status === "Pending" && (
                  <button onClick={() => cancelOrder(order._id)} style={{ backgroundColor: "#FF0000", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>Cancel Order</button>
                )}
              </div>
              <p>Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;