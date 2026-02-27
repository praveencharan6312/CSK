const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  userId: String,
  placeName: String,
  addedAt: { type: Date, default: Date.now }
});

const Place = mongoose.model('Place', placeSchema);

router.post('/add', async (req, res) => {
  const { userId, placeName } = req.body;
  const place = await Place.create({ userId, placeName });
  res.json({ success: true, place });
});

router.get('/:userId', async (req, res) => {
  const places = await Place.find({ userId: req.params.userId });
  res.json(places);
});

module.exports = router;
