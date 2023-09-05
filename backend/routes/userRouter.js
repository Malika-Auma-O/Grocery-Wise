const router = require("express").Router();
const { getAllUsers, getOneUser, deleteUser, updateUserProfile } = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/users", getAllUsers);
router.get("/user/profile/:id", verifyToken, getOneUser );
router.delete("/user/:id/profile",  deleteUser ); //for admin use
router.put("/user/profile/:id", verifyToken, updateUserProfile); 
router.put("/users/:id",  updateUserProfile); //for admin use

module.exports = router;