require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = Number(process.env.SALT_ROUNDS);
const generateToken = require("../utils/generateToken");
const privateKey = process.env.PRIVATE_KEY;
const crypto = require('crypto');
const port = process.env.PORT || 8080;
const sendPasswordResetEmail = require("../utils/email/sendEmail")

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
      // const token = generateToken(payload, "1h");
      const token = generateToken(payload);

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
      // const token = generateToken(payload, "1h");
      const token = generateToken(payload);

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
        // const newToken = generateToken({ userId: user._id, username: user.username}, "1h");
      // console.log(newToken)
      const newToken = generateToken({ userId: user._id, username: user.username});

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

// Request password reset
const requestPasswordReset = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log('Generated Reset Token:', resetToken);
    user.resetToken = resetToken;
    console.log('Generated use Reset Token:',user.resetToken)
    user.resetTokenExpiry = Date.now() + 3600000;
    console.log('Expiry Reset Token:', user.resetTokenExpiry) // Token valid for 1 hour
    await user.save();
    console.log("user saved")

    // Send password reset email
    const resetLink = `http://localhost:3636/api/auth/request-password?token=${resetToken}`;
    sendPasswordResetEmail(user.username, resetLink);

    return res.status(200).send({ msg: 'Password reset email sent' });
  } catch (error) {
    res.status(500).send({ msg: 'Error requesting password reset', error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user with matching reset token and token expiry
    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).send({ msg: 'Invalid or expired reset token' });
    }

    // Update user's password and reset token fields
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.status(200).send({ msg: 'Password reset successful' });
  } catch (error) {
    res.status(500).send({ msg: 'Error resetting password', error });
  }
};


module.exports = {
  signUp,
  login,
  verify,
  requestPasswordReset,
  resetPassword
}