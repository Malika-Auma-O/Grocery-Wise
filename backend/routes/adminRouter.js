const router = require("express").Router();
const {adminSignUp, adminLogin, verifyAdmin, updateAdminProfile, getOneAdmin} = require("../controllers/adminController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/admin/signup", adminSignUp);
router.post("/admin/login", adminLogin );
router.post("/admin/verify", verifyAdmin );
router.put("/admin/profile/:id", verifyToken, updateAdminProfile);
router.get("/admin/profile/:id", verifyToken, getOneAdmin);

module.exports = router
