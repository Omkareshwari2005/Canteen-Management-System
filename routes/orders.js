const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// PLACE ORDER
router.post('/', async (req, res) => {
    await new Order(req.body).save();
    res.json({ success: true });
});

// GET ALL ORDERS (Chef)
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

// GET USER ORDERS (Student)
router.get('/user/:username', async (req, res) => {
    const orders = await Order.find({ user: req.params.username });
    res.json(orders);
});

// UPDATE STATUS
router.post('/update', async (req, res) => {
    const { id, status } = req.body;
    await Order.findByIdAndUpdate(id, { status: status });
    res.json({ success: true });
});

// CANCEL ORDER
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order.status !== "Pending") {
            return res.json({ success: false, message: "Cannot cancel order that is already Ready!" });
        }
        await Order.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Order Cancelled Successfully" });
    } catch (err) { res.status(500).json({ success: false }); }
});

module.exports = router;