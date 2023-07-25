const mongoose = require("mongoose");

const TemporaryNeedSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  userId: {type: String}
}, {timestamps: true});

const TemporaryNeed = mongoose.model("TemporaryNeed", TemporaryNeedSchema);

module.exports = TemporaryNeed;