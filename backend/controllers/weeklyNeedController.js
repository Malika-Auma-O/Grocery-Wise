const WeeklyNeed = require("../models/weeklyNeed");

const addWeeklyNeed = async(req, res) =>{
  try {
    const userId = req.user.userId;
    let need = {
      userId: userId,
      name: req.body.name,
    }
    
    const newWeeklyNeed = await WeeklyNeed.create(need);
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
    const need = await WeeklyNeed.findById(req.params.id);
    if (need.userId !== req.user.userId) {
      return res.status(403).send({ msg: "Unauthorized to delete this need" });
    } else {
      await WeeklyNeed.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "WeeklyNeed deleted successfully" });
    }   
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting the WeeklyNeed" });
  }
}

const getUserWeeklyNeeds = async(req, res) =>{
  try {
    const weeklyNeeds = await WeeklyNeed.find({ userId: req.user.userId });
    res.send(weeklyNeeds);
  } catch (error) {
    res.status(401).send({ msg: "Unauthorized access", error });
  }
}

const updateWeeklyNeed = async(req, res) =>{
  try {

    // Set the user ID from the authentication token
    req.body.userId = req.user.userId;

    // Find the need by ID
    const need = await WeeklyNeed.findById(req.params.id);

    // Check if the authenticated user owns the need
    if (need.userId !== req.user.userId) {
      return res.status(403).send({ msg: "Unauthorized to update this item" });
    }

     // Find by ID and update only the specified fields using $set
    const updatedNeed = await WeeklyNeed.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //true returns the updated need object
    );
    res.status(200).send({ msg: "need updated successfully", updatedNeed });
  } catch (error) {
    res.status(500).send({ msg: "Unable to update need", error });
  }
}

module.exports = {
  addWeeklyNeed,
  getAllWeeklyNeeds,
  deleteWeeklyNeed,
  getUserWeeklyNeeds,
  updateWeeklyNeed
};