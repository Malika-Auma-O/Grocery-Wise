const router = require("express").Router();
const { getAllUsers, getOneUser, deleteUser, updateUserProfile } = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/users", verifyToken, getAllUsers);
router.get("/users/:id", verifyToken, getOneUser );
router.delete("/users/:id", verifyToken, deleteUser );
router.put("/users/user", verifyToken, updateUserProfile); 
// router.put("/users/:id", verifyToken, updateUserProfile); //for admin use

module.exports = router;