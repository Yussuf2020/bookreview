const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookTitle: String,
  content: String,
  rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
