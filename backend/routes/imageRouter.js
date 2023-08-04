const express = require("express");
const router = express.Router();
const { uploadImage, getAllImages, getOneUserImage, getAllUserImages, updateImage} = require("../controllers/imageController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/upload", verifyToken, uploadImage);
router.get("/images/", getAllImages);
router.get("/user/images/:id", verifyToken, getOneUserImage);
router.get("/user/images/", verifyToken, getAllUserImages);
router.put("/user/images/:id", verifyToken, updateImage);

module.exports = router;