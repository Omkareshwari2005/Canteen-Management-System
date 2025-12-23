const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import Models for Seeding
const User = require('./models/User');
const Item = require('./models/Item');

// Import Routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

app.use(cors());
app.use(express.json());

// --- DB CONNECTION ---
const DB_URL = 'mongodb://0.0.0.0:27017/canteenDB';

mongoose.connect(DB_URL)
.then(async () => {
    console.log("✅ MongoDB Connected Successfully!");
    await seedData(); 
})
.catch(err => console.error("❌ DB Connection Error:", err.message));

// --- ROUTES MIDDLEWARE ---
// This automatically adds '/api' before the routes
app.use('/api', authRoutes);       // Login/Register
app.use('/api/menu', menuRoutes);  // Menu CRUD
app.use('/api/orders', orderRoutes); // Order Management

// --- SEEDING LOGIC ---
async function seedData() {
    try {
        if (await User.countDocuments() === 0) {
            await User.create([
                { username: "admin", password: "123", role: "admin" },
                { username: "student", password: "123", role: "student" }
            ]);
            console.log("✅ Users Created");
        }
        if (await Item.countDocuments() === 0) {
            await Item.insertMany([
                { name: "Veg Burger", price: 50, category: "Snacks" },
                { name: "Chicken Roll", price: 80, category: "Snacks" },
                { name: "Paneer Thali", price: 120, category: "Lunch" },
                { name: "Cold Coffee", price: 40, category: "Drinks" }
            ]);
            console.log("✅ Menu Seeded");
        }
    } catch (error) { console.log("Seeding Error:", error); }
}

app.listen(5000, () => console.log("🚀 Server running on port 5000"));