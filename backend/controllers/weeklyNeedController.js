const WeeklyNeed = require("../models/weeklyNeed");

const addWeeklyNeed = async(req, res) =>{
  try {
    req.body.userId = req.user.userId;
    const newWeeklyNeed = await WeeklyNeed.create(req.body);
    res.status(201).send({ msg: "WeeklyNeed added successfully", newWeeklyNeed });
  } catch (error) {
    res.status(500).send({ msg: "Unable to add WeeklyNeed", error });
  }
}

const getAllWeeklyNeeds = async(req, res) =>{
  try {
    const weeklyNeed = await WeeklyNeed.find();
    res.send(weeklyNeed);
  } catch (error) {
    res.status(500).send({ msg: "An error occurred while getting weeklyNeed", error });
  }
}

const deleteWeeklyNeed = async(req, res) =>{
  try {
    await WeeklyNeed.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "WeeklyNeed deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting the WeeklyNeed" });
  }
}

const getUserWeeklyNeeds = async(req, res) =>{
  try {
    const userWeeklyNeeds = await WeeklyNeed.find({ userId: req.user.userId });
    res.send(userWeeklyNeeds);
  } catch (error) {
    res.status(401).send({ msg: "Unauthorized access", error });
  }
}

module.exports = {
  addWeeklyNeed,
  getAllWeeklyNeeds,
  deleteWeeklyNeed,
  getUserWeeklyNeeds,
};