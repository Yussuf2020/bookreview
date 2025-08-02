const router = require('express').Router();
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort('-createdAt');
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (e) {
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
