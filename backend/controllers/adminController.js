
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = Number(process.env.SALT_ROUNDS);
const generateToken = require("../utils/generateToken");
const privateKey = process.env.PRIVATE_KEY;
const port = process.env.PORT || 8080;
const Admin = require("../models/admin");
const { userAvatarParser } = require("../middleware/uploadMiddleware")

const adminSignUp = async (req, res) =>{
    try {
        const {username, password} = req.body;
    if(!username || !password) {
      return res.status(400).send({msg: "Both username and password required"});
    }

    const checkAdmin = await Admin.findOne({email: req.body.email})
    if (checkAdmin) {
        return res.status(409).send({msg: `User with username ${username
        } already exists`});
    } else {
        const hashPassword = await bcrypt.hash(password, saltRounds);
      const newAdmin = await Admin.create({username, password: hashPassword});

      // Create a payload for the JWT
      const payload = {
        admin: {
          id: newAdmin._id,
          username: newAdmin.username,
        },
      };

      const token = generateToken(payload);

      // Send the token and user data back to the client
      return res.status(201).send({msg: "Registered successfully", token, newAdmin})
      
    }

    } catch (error) {
        res.status(500).json({msg:"Error in registration:", error});
    }
}

const adminLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
    if(!username || !password) {
      return res.status(400).send({msg: "Both username and password required"});
    } else {
        const checkAdmin = await Admin.findOne({username});
      if(!checkAdmin) {
        return res.status(404).send({msg:"Admin does not exist" });
      } else {

         // Validate the password
        const validatePassword = await bcrypt.compare(password, checkAdmin.password)
        if (!validatePassword) {
          return res.status(401).send({ msg : "Invalid Password"})
        }

         // Create a payload containing both userId and username
      const payload = {
        userId: checkAdmin._id,
        username: checkAdmin.username,
      };
      
      // Generate the JWT from the generateToken.js in utils
      // const token = generateToken(payload, "1h");
      const token = generateToken(payload);

       // Send the token back to the client
      return res.status(201).send({msg: "Login successful", token})
      }
    }

    } catch (error) {
        res.status(500).send(error)
    }
}

const verifyAdmin = async (req, res) => {
    if (!req.body.token) {
        return res.status(400).send({ msg: "Token is required" });
        return
      }
    try {
        // Verify the token using the private key
    const payload = jwt.verify(req.body.token, privateKey);
 
    if (payload){

      // Find the admin in the database based on the payload's ID
      const admin = await Admin.findOne({ _id:payload.userId});
      if(admin){
        // console.log(admin)

    
      const newToken = generateToken({ userId: admin._id, username: admin.username});

        // Send the admin data and the new token back to the client
        return res.status(200).send({ admin, token: newToken });
      } else {
        return res.status(404).send({ msg: "admin not found" });
      }
    } else {
      return res.status(401).send({ msg: "Token is Invalid" });
    }
    } catch (error) {
        res.status(500).send({msg: "Invalid Token", error})
    }
}

// Use the userAvatarParser middleware for uploading user avatars
const uploadUserAvatar = userAvatarParser.single("avatar");

const updateAdminProfile = async (req, res) => {
  try {
    // Set the user ID from the authentication token
    const userId = req.user.userId;

    // Check if the user exists
    const existingAdmin = await Admin.findById(userId);

    if (!existingAdmin) {
      return res.status(404).send({ msg: "Admin not found" });
    }

    // Use the uploadUserAvatar middleware for handling avatar upload
    uploadUserAvatar(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ msg: "Failed to upload avatar", error: err });
      }

      // Update the user profile details with the new data
      existingAdmin.firstName = req.body.firstName || existingAdmin.firstName;
      existingAdmin.lastName = req.body.lastName || existingAdmin.lastName;
      existingAdmin.username = req.body.username || existingAdmin.username;
      // existingAdmin.password = req.body.password || existingAdmin.password;
      existingAdmin.dateOfBirth = req.body.dateOfBirth || existingAdmin.dateOfBirth;
      existingAdmin.location = req.body.location || existingAdmin.location;
      existingAdmin.phone = req.body.phone || existingAdmin.phone;

      // if a new avatar is uploaded, save the Cloudinary avatar URL and public ID to the user
      if (req.file) {
        existingAdmin.avatar = req.file.path;
        existingAdmin.avatarPublicId = req.file.filename;
      }

      // Save the updated user profile to the database
      await existingAdmin.save();

      // Exclude the password from the response
      const updatedAdmin = { ...existingAdmin.toObject() };
      delete updatedAdmin.password;

      res.send({ msg: "Admin profile updated successfully", updatedAdmin: existingAdmin });
    });
  } catch (error) {
    console.log("error updating Admin profile", error);
    res.status(500).send({ msg: "Unable to update Admin profile", error });
  }
};

// Get one admin by ID
const getOneAdmin = async(req, res) =>{
  try {
    const admin = await Admin.findById({_id: req.params.id});

    // check for admin, and send the admin as a response
    if (!admin) {
      res.status(404).send({ errorCode: 404, message: "Admin not found" });
      return;
    }
    res.status(200).send(admin);   
  } catch (error) {
    res.status(500).send({msg: "Failed to get admin", error});
  }
}

module.exports = {
    adminSignUp,
    adminLogin,
    verifyAdmin,
    updateAdminProfile,
    getOneAdmin
}