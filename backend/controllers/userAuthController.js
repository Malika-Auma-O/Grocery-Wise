require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = Number(process.env.SALT_ROUNDS);
const generateToken = require("../utils/generateToken");
const privateKey = process.env.PRIVATE_KEY;

// Sign up a new user
const signUp = async(req, res) =>{
  try {
    const {username, password} = req.body;
    if(!username || !password) {
      return res.status(400).send({msg: "Both username and password required"});
    }

    // Check if the user already exists
    const checkUser = await User.findOne({username});
    if(checkUser) {
      return res.status(409).send({msg: `User with username ${username
        } already exists`});
    } else {    
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({username, password: hashPassword})
      
      // Create a payload for the JWT
      const payload = {
        user: {
          id: newUser._id,
          username: newUser.username,
        },
      };

      // Generate the JWT from the generateToken.js in utils
      const token = generateToken(payload, "1h");

      // Send the token and user data back to the client
      return res.status(201).send({msg: "Registered successfully", token, newUser})
    }
  } catch (error) {
    res.status(500).json({msg:"Error in registration:", error});
  }
}

// User login
const login = async(req, res) =>{
  try {
    const {username, password} = req.body;
    if(!username || !password) {
      return res.status(400).send({msg: "Both username and password required"});
    }

    // Find the user in the database
    const checkUser = await User.findOne({username});
      if(!checkUser) {
        return res.status(404).send({msg:"User does not exist" });
      } else {

         // Validate the password
        const validatePassword = await bcrypt.compare(password, checkUser.password)
        if (!validatePassword) {
          return res.status(401).send({ msg : "Invalid Password"})
        }

         // Create a payload containing both userId and username
      const payload = {
        userId: checkUser._id,
        username: checkUser.username,
      };
      
      // Generate the JWT from the generateToken.js in utils
      const token = generateToken(payload, "1h");

       // Send the token back to the client
      return res.status(201).send({msg: "Login successful", token})
      }
  } catch (error) {
    res.status(500).send(error)
  }
}

//// Verify user token
const verify = async(req, res) =>{
  if (!req.body.token){
    return res.status(400).send({ msg: "Token is required" });
}
  try {

    // Verify the token using the private key
    const payload = jwt.verify(req.body.token, privateKey);
 
    if (payload){

      // Find the user in the database based on the payload's ID
      const user = await User.findOne({ _id:payload.userId});
      if(user){
        // console.log(user)

        // Generate a new token with updated user information
        const newToken = generateToken({ userId: user._id, username: user.username}, "1h");
      // console.log(newToken)

        // Send the user data and the new token back to the client
        return res.status(200).send({ user, token: newToken });
      } else {
        return res.status(404).send({ msg: "User not found" });
      }
    } else {
      return res.status(401).send({ msg: "Token is Invalid" });
    }
  } catch (error) {
    res.status(500).send({msg: "Invalid Token", error})
  }
}

module.exports = {
  signUp,
  login,
  verify
}