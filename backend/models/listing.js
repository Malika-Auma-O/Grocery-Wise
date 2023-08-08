const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    store: { type: String },
    price: { type: Number }
  })
  
  const Listing = mongoose.model("Listing", ListingSchema)

  module.exports = Listing;