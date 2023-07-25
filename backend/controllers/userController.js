const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const saltRounds = Number(process.env.SALT_ROUNDS);

// Get all users
const getAllUsers = async(req, res) =>{
  try {
    const users = await User.find();

    // Respond with the list of users
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({msg: "Failed to get users", error});
  }
}

// Get one user by ID
const getOneUser = async(req, res) =>{
  try {
    const user = await User.findById({_id: req.params.id});

    // check for user, and send the user as a response
    if (!user) {
      res.status(404).send({ errorCode: 404, message: "User not found" });
      return;
    }
    res.status(200).send(user);   
  } catch (error) {
    res.status(500).send({msg: "Failed to get user", error});
  }
}

// Delete user by ID
const deleteUser = async(req, res) =>{
  // Find and delete a user by the given ID in the request params
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.send({msg: "user deleted"})
  } catch (error) {
   res.send({msg: "cannot delete user", error})
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser
}