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

const updateUserProfile = async (req, res) => {
  try {
    // Set the user ID from the authentication token
    const userId = req.user.userId;

    // Check if the user exists
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Use the uploadUserAvatar middleware for handling avatar upload
    uploadUserAvatar(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ msg: "Failed to upload avatar", error: err });
      }

      // Update the user profile details with the new data
      existingUser.firstName = req.body.firstName || existingUser.firstName;
      existingUser.lastName = req.body.lastName || existingUser.lastName;
      existingUser.username = req.body.username || existingUser.username;
      // existingUser.password = req.body.password || existingUser.password;
      existingUser.dateOfBirth = req.body.dateOfBirth || existingUser.dateOfBirth;
      existingUser.location = req.body.location || existingUser.location;
      existingUser.phone = req.body.phone || existingUser.phone;

      // if a new avatar is uploaded, save the Cloudinary avatar URL and public ID to the user
      if (req.file) {
        existingUser.avatar = req.file.path;
        existingUser.avatarPublicId = req.file.filename;
      }

      // Save the updated user profile to the database
      await existingUser.save();

      // Exclude the password from the response
      const updatedUser = { ...existingUser.toObject() };
      delete updatedUser.password;

      res.send({ msg: "User profile updated successfully", updatedUser: existingUser });
    });
  } catch (error) {
    console.log("error updating user profile", error);
    res.status(500).send({ msg: "Unable to update user profile", error });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUserProfile
}