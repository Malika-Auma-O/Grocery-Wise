const router = require("express").Router();
const { getAllUsers, getOneUser, deleteUser } = require("../controllers/userController");

router.get("/users", getAllUsers);
router.get("/users/:id", getOneUser );
router.delete("/users/:id", deleteUser );

module.exports = router;