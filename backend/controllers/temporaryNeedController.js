const TemporaryNeed = require("../models/temporaryNeed");

const addTemporaryNeed = async(req, res) =>{
  try {
    const userId = req.user.userId;
    let need = {
      userId: userId,
      name: req.body.name,
    }
    // console.log(need)
    const newTemporaryNeed = await TemporaryNeed.create(need);
    res.status(201).send({ msg: "TemporaryNeed added successfully", newTemporaryNeed });
  } catch (error) {
    res.status(500).send({ msg: "Unable to add TemporaryNeed", error });
  }
}

const getAllTemporaryNeeds = async(req, res) =>{
  try {
    const temporaryNeed = await TemporaryNeed.find({ userId: req.user.userId });
    res.send(temporaryNeed);
  } catch (error) {
    res.status(500).send({ msg: "An error occurred while getting TemporaryNeeds", error });
  }
}

const deleteTemporaryNeed = async(req, res) =>{
  try {
    const need = await TemporaryNeed.findById(req.params.id);
    if (need.userId !== req.user.userId) {
      return res.status(403).send({ msg: "Unauthorized to delete this need" });
    } else {
      await TemporaryNeed.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "TemporaryNeed deleted successfully" });
    }   
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

const updateTemporaryNeed = async(req, res) =>{
  try {

    // Set the user ID from the authentication token
    req.body.userId = req.user.userId;

    // Find the need by ID
    const need = await TemporaryNeed.findById(req.params.id);

    // Check if the authenticated user owns the need
    if (need.userId !== req.user.userId) {
      return res.status(403).send({ msg: "Unauthorized to update this item" });
    }

     // Find by ID and update only the specified fields using $set
    const updatedNeed = await TemporaryNeed.findByIdAndUpdate(
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
  addTemporaryNeed,
  getAllTemporaryNeeds,
  deleteTemporaryNeed,
  updateTemporaryNeed,
  getUserTemporaryNeeds,
};