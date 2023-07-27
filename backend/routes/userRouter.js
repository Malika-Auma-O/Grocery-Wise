const router = require("express").Router();
const { getAllUsers, getOneUser, deleteUser, updateUserProfile } = require("../controllers/userController");

router.get("/users", getAllUsers);
router.get("/users/:id", getOneUser );
router.delete("/users/:id", deleteUser );
router.put("/users/:id", updateUserProfile); //not functioning yet

module.exports = router;