const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema( {
  name: { type: String, required: true },
}, {timestamps: true});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;