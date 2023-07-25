require("../connection")
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema("User", {
  username: {type: String, require: true},
  email: {type: String, require: true},
  password: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  favorites: [String], 
  weeklyNeeds: [{
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }],
  temporaryNeeds: [{
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;