const connection = require("../connection");
const mongoose = require("mongoose");


const ImageSchema = new mongoose.Schema({
   image: String,
   publicId: String,
   userId: String,
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;