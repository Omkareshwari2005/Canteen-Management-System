import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Import Components
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import StudentDashboard from './components/StudentDashboard';
import ChefDashboard from './components/ChefDashboard';

function App() {
  // --- STATE ---
  const [user, setUser] = useState(null); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [authMsg, setAuthMsg] = useState("");
  const [activeTab, setActiveTab] = useState("home"); 

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); 
  const [myOrders, setMyOrders] = useState([]); 
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Snacks" });
  const [editingItem, setEditingItem] = useState(null); 
  const [editFormData, setEditFormData] = useState({ name: "", price: "", category: "" });

  // --- EFFECT ---
  useEffect(() => {
    if(user) {
        fetchMenu();
        if(user.role === 'admin') {
            fetchOrders();
            const interval = setInterval(fetchOrders, 2000);
            return () => clearInterval(interval);
        } else {
            fetchMyOrders();
            const interval = setInterval(fetchMyOrders, 2000); 
            return () => clearInterval(interval);
        }
    }
  }, [user]);

  // --- HANDLERS (Same Logic, just passed down) ---
  const handleLogin = () => {
      axios.post('http://localhost:5000/api/login', { username, password })
      .then(res => {
          if(res.data.success) {
            setUser({ username: res.data.username, role: res.data.role });
            setActiveTab(res.data.role === 'admin' ? 'pending' : 'home'); 
            setAuthMsg("");
          } else { setAuthMsg(res.data.message); }
      }).catch(() => setAuthMsg("Invalid Username or Password"));
  };

  const handleRegister = () => {
      axios.post('http://localhost:5000/api/register', { username, password })
      .then(res => {
          if(res.data.success) {
              setAuthMsg("Registration Success! Please Login.");
              setIsRegistering(false); 
          } else { setAuthMsg(res.data.message); }
      }).catch(() => setAuthMsg("Registration Failed."));
  };

  const handleLogout = () => {
      setUser(null); setCart([]); setMyOrders([]); setUsername(""); setPassword(""); setAuthMsg(""); setActiveTab("home");
  };

  const fetchMenu = () => axios.get('http://localhost:5000/api/menu').then(res => setMenu(res.data));
  const fetchOrders = () => axios.get('http://localhost:5000/api/orders').then(res => setOrders(res.data));
  
  const fetchMyOrders = () => {
      if(user) axios.get(`http://localhost:5000/api/orders/user/${user.username}`).then(res => setMyOrders(res.data.reverse())); 
  };

  const placeOrder = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // 👇 CHANGED URL: Added 's' to make it plural ('/api/orders')
    axios.post('http://localhost:5000/api/orders', { items: cart, total, user: user.username })
      .then(() => {
        setMsg("Order Sent to Kitchen!"); 
        setCart([]); 
        fetchMyOrders(); 
        setActiveTab("history"); 
        setTimeout(() => setMsg(""), 3000);
      });
  };

  const addNewDish = () => {
      if(!newItem.name || !newItem.price) return alert("Please fill details");
      axios.post('http://localhost:5000/api/menu/add', newItem).then(() => {
          alert("Dish Added!"); setNewItem({ name: "", price: "", category: "Snacks" }); fetchMenu();
      });
  };

  const deleteDish = (id) => {
      if(window.confirm("Delete this dish?")) axios.delete(`http://localhost:5000/api/menu/${id}`).then(() => fetchMenu());
  };

  const startEditing = (item) => {
      setEditingItem(item._id);
      setEditFormData({ name: item.name, price: item.price, category: item.category });
  };

  const saveEdit = (id) => {
      axios.put(`http://localhost:5000/api/menu/${id}`, editFormData).then(() => { setEditingItem(null); fetchMenu(); });
  };

  const cancelOrder = (id) => {
      if(window.confirm("Cancel this order?")) {
          axios.delete(`http://localhost:5000/api/orders/${id}`).then(res => {
              if(res.data.success) { fetchMyOrders(); alert("Order Cancelled."); } else { alert(res.data.message); }
          });
      }
  };

  const updateStatus = (id, status) => {
      axios.post('http://localhost:5000/api/orders/update', { id, status }).then(() => fetchOrders());
  };

  const addToCart = (item) => setCart([...cart, item]);
  
  const filteredMenu = menu.filter(item => (category === "All" || item.category === category) && item.name.toLowerCase().includes(search.toLowerCase()));

  // --- RENDER ---
  if (!user) {
      return (
        <Auth 
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          isRegistering={isRegistering} setIsRegistering={setIsRegistering}
          handleLogin={handleLogin} handleRegister={handleRegister}
          authMsg={authMsg} setAuthMsg={setAuthMsg}
        />
      );
  }

  return (
    <div style={{ fontFamily: "Arial", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Navbar user={user} activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      {user.role === 'student' ? (
        <StudentDashboard 
          activeTab={activeTab} filteredMenu={filteredMenu}
          cart={cart} addToCart={addToCart} placeOrder={placeOrder}
          myOrders={myOrders} cancelOrder={cancelOrder}
          category={category} setCategory={setCategory}
          setSearch={setSearch} msg={msg}
        />
      ) : (
        <ChefDashboard 
          activeTab={activeTab} orders={orders} updateStatus={updateStatus}
          menu={menu} newItem={newItem} setNewItem={setNewItem}
          addNewDish={addNewDish} deleteDish={deleteDish}
          startEditing={startEditing} saveEdit={saveEdit}
          editingItem={editingItem} setEditingItem={setEditingItem}
          editFormData={editFormData} setEditFormData={setEditFormData}
        />
      )}
    </div>
  );
}

export default App;