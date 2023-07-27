const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: String, required: false },
  brand: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  imagePublicId: { type: String, required: false },
  store: { type: String },
  location: {
    latitude: { type: Number, required: false},
    longitude: { type: Number, required: false},
  },
  rating: { type: Number, default: 0 },
  userId: {type: String},
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;