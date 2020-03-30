const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  platforms: [String],
  image: String,
}, {
  toJSON: {
    virtuals: true
  },
  id: false
});

ProductSchema.virtual('imageUrl').get(function() {
  return `http://localhost:3333/files/${this.image}`
});

module.exports = mongoose.model('Product', ProductSchema);