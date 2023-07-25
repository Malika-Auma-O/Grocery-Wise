const mongoose = require("mongoose");

const WeeklyNeedSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  userId: {type: String}
}, {timestamps: true});

const WeeklyNeed = mongoose.model("WeeklyNeed", WeeklyNeedSchema);

module.exports = WeeklyNeed;