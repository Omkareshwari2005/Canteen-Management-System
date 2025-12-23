const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET MENU
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// ADD ITEM
router.post('/add', async (req, res) => {
    try {
        await new Item(req.body).save();
        res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
});

// UPDATE ITEM
router.put('/:id', async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
});

// DELETE ITEM
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
});

module.exports = router;