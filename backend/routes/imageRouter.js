const express = require("express");
const router = express.Router();
const { uploadImage, getImage } = require("../controllers/imageController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/images:/id", uploadImage);
router.get("/images/", verifyToken, getImage);

module.exports = router;