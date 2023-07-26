const Favorite = require("../models/favorite");

const addFavorite = async(req, res) =>{
  try {
    req.body.userId = req.user.userId;
    const newFavorite = await Favorite.create(req.body);
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
    await Favorite.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "Favorite deleted successfully" });
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

module.exports = {
  addFavorite,
  getAllFavorites,
  deleteFavorite,
  getUserFavorites,
};