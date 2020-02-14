const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  platforms: [String],
  image: String,
  id: String
});

module.exports = mongoose.model('Product', ProductSchema);