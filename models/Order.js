const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: Array,
    total: Number,
    status: { type: String, default: "Pending" },
    user: String, 
    date: { type: String, default: () => new Date().toLocaleTimeString() }
});

module.exports = mongoose.model('Order', OrderSchema);