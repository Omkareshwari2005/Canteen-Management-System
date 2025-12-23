import React from 'react';

const ChefDashboard = ({ 
  activeTab, orders, updateStatus, 
  menu, newItem, setNewItem, addNewDish, 
  deleteDish, startEditing, saveEdit, editingItem, setEditingItem, 
  editFormData, setEditFormData 
}) => {
  
  return (
    <div style={{ padding: "20px" }}>
      {/* PENDING ORDERS */}
      {activeTab === 'pending' && (
        <div>
          <h2>🕒 Pending Orders</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {orders.filter(o => o.status === "Pending").map(order => (
              <div key={order._id} style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", borderLeft: "5px solid orange" }}>
                <h3>Order #{order._id.slice(-4)}</h3>
                <p>User: {order.user}</p>
                <ul>{order.items.map((i, x) => <li key={x}>{i.name}</li>)}</ul>
                <button onClick={() => updateStatus(order._id, "Completed")} style={{ width: "100%", padding: "10px", backgroundColor: "#9BEC00", color: "white", border: "none" }}>Mark Ready</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPLETED ORDERS */}
      {activeTab === 'completed' && (
        <div>
          <h2>✅ Completed</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {orders.filter(o => o.status === "Completed").map(order => (
              <div key={order._id} style={{ backgroundColor: "#EEEEEE", padding: "20px", borderRadius: "10px", borderLeft: "5px solid #393E46" }}>
                <h3>Order #{order._id.slice(-4)}</h3>
                <p>User: {order.user}</p>
                <p>Total: ₹{order.total}</p>
                <button disabled style={{ width: "100%", padding: "10px", backgroundColor: "#ccc", border: "none" }}>Served</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MANAGE MENU */}
      {activeTab === 'manage_menu' && (
        <div style={{ display: "flex", gap: "30px" }}>
          <div style={{ flex: 1, backgroundColor: "white", padding: "30px", borderRadius: "10px", height: "fit-content" }}>
            <h2 style={{ color: "#AAC4F5" }}> Add New Dish</h2>
            <input style={{ width: "90%", padding: "10px", margin: "5px 0" }} placeholder="Dish Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
            <input type="number" style={{ width: "90%", padding: "10px", margin: "5px 0" }} placeholder="Price (₹)" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
            <select style={{ width: "100%", padding: "10px", margin: "5px 0" }} value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
              <option value="Snacks">Snacks</option><option value="Lunch">Lunch</option><option value="Drinks">Drinks</option>
            </select>
            <button onClick={addNewDish} style={{ width: "100%", padding: "10px", backgroundColor: "#9BEC00", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>Add to Menu</button>
          </div>

          <div style={{ flex: 2 }}>
            <h2> Edit Menu Items</h2>
            <div style={{ display: "grid", gap: "10px" }}>
              {menu.map(item => (
                <div key={item._id} style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {editingItem === item._id ? (
                    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                      <input value={editFormData.name} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} />
                      <input type="number" value={editFormData.price} onChange={e => setEditFormData({ ...editFormData, price: e.target.value })} style={{ width: "80px" }} />
                      <button onClick={() => saveEdit(item._id)} style={{ backgroundColor: "#9BEC00", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Save</button>
                      <button onClick={() => setEditingItem(null)} style={{ backgroundColor: "#ccc", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <div><strong>{item.name}</strong> - ₹{item.price} <span style={{ color: "#888", fontSize: "0.9em" }}>({item.category})</span></div>
                      <div>
                        <button onClick={() => startEditing(item)} style={{ marginRight: "10px", backgroundColor: "#8CA9FF", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => deleteDish(item._id)} style={{ backgroundColor: "#FF0000", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefDashboard;