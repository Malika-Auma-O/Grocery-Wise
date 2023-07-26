const TemporaryNeed = require("../models/temporaryNeed");

const addTemporaryNeed = async(req, res) =>{
  try {
    req.body.userId = req.user.userId;
    const newTemporaryNeed = await TemporaryNeed.create(req.body);
    res.status(201).send({ msg: "TemporaryNeed added successfully", newTemporaryNeed });
  } catch (error) {
    res.status(500).send({ msg: "Unable to add TemporaryNeed", error });
  }
}

const getAllTemporaryNeeds = async(req, res) =>{
  try {
    const temporaryNeed = await TemporaryNeed.find();
    res.send(temporaryNeed);
  } catch (error) {
    res.status(500).send({ msg: "An error occurred while getting TemporaryNeeds", error });
  }
}

const deleteTemporaryNeed = async(req, res) =>{
  try {
    await TemporaryNeed.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "TemporaryNeed deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting the TemporaryNeed" });
  }
}

const getUserTemporaryNeeds = async(req, res) =>{
  try {
    const userTemporaryNeeds = await TemporaryNeed.find({ userId: req.user.userId });
    res.send(userTemporaryNeeds);
  } catch (error) {
    res.status(401).send({ msg: "Unauthorized access", error });
  }
}

module.exports = {
  addTemporaryNeed,
  getAllTemporaryNeeds,
  deleteTemporaryNeed,
  getUserTemporaryNeeds,
};