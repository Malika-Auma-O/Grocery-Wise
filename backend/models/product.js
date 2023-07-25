const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  store: { type: String },
  location: {
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
  },
  rating: { type: Number, default: 0 },
  userId: {type: String},
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;