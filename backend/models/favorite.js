const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  userId: {type: String}
}, {timestamps: true});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;