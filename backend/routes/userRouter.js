const router = require("express").Router();
const { getAllUsers, getOneUser, deleteUser, updateUserProfile } = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/users", verifyToken, getAllUsers);
router.get("/user/profile/:id", verifyToken, getOneUser );
router.delete("/user/:id/profile", verifyToken, deleteUser );
router.put("/user/profile/:id", verifyToken, updateUserProfile); 
router.put("/users/:id", verifyToken, updateUserProfile); //for admin use

module.exports = router;