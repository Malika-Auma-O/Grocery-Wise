const Favorite = require("../models/favorite");

const addFavorite = async(req, res) =>{
  try {
    const userId = req.user.userId;
    let favorite= {
      userId: userId,
      name: req.body.name,
    }
    const newFavorite = await Favorite.create(favorite);
    res.status(201).send({ msg: "Favorite added successfully", newFavorite });
  } catch (error) {
    res.status(500).send({ msg: "Unable to add favorite", error });
  }
}

const getAllFavorites = async(req, res) =>{
  try {
    const favorites = await Favorite.find();
    res.send(favorites);
  } catch (error) {
    res.status(500).send({ msg: "An error occurred while getting favorites", error });
  }
}

const deleteFavorite = async(req, res) =>{
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (favorite.userId !== req.user.userId) {
      return res.status(403).send({ msg: "Unauthorized to delete this favorite" });
    }else {
      await Favorite.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "Favorite deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting the favorite" });
  }
}

const getUserFavorites = async(req, res) =>{
  try {
    const userFavorites = await Favorite.find({ userId: req.user.userId });
    res.send(userFavorites);
  } catch (error) {
    res.status(401).send({ msg: "Unauthorized access", error });
  }
}

const updateFavorite = async(req, res) =>{
  try {

    // Set the user ID from the authentication token
    req.body.userId = req.user.userId;

    // Find the favorite by ID
    const favorite = await Favorite.findById(req.params.id);

    // Check if the authenticated user owns the favorite
    if (favorite.userId !== req.user.userId) {
      return res.status(403).send({ msg: "Unauthorized to update this item" });
    }

     // Find by ID and update only the specified fields using $set
    const updatedFavorite = await Favorite.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //true returns the updated favorite object
    );
    res.status(200).send({ msg: "favorite updated successfully", updatedFavorite });
  } catch (error) {
    res.status(500).send({ msg: "Unable to update favorite", error });
  }
}

module.exports = {
  addFavorite,
  getAllFavorites,
  deleteFavorite,
  getUserFavorites,
  updateFavorite
};