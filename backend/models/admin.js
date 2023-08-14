const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, require: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  avatarPublicId: { type: String, required: false },
  isAdmin:{type : Boolean , default:true}
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
