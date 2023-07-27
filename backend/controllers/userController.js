const User = require("../models/user");
const { userAvatarParser } = require("../middleware/uploadMiddleware")

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

// Use the userAvatarParser middleware for uploading user avatars
const uploadUserAvatar = userAvatarParser.single("avatar");


// Update user profile
const updateUserProfile = async(req,res)=>{
  try {

    // Check if the user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ errorCode: 404, message: "User not found" });
    }

    uploadUserAvatar(req, res, async (err)=>{
      if (err) {
        return res.status(500).send({ msg: "Failed to upload user avatar", error: err });
      }
      // Handle avatar upload
      if (req.file) {
         // Delete the existing avatar from Cloudinary if it exists
        const user = await User.findById(req.params.id);
        if (user && user.avatarPublicId) {
          await cloudinary.uploader.destroy(user.avatarPublicId);
        }
        
        // Store the new avatar details in the user object
        user.profilePicture = req.file.path;
        user.avatarPublicId = req.file.filename;
      }
      
      // Update the user profile in the database
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).send(updatedUser);
    })    
  } catch (error) {
    res.status(500).send({ msg: "Failed to update user profile", error });
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUserProfile
}