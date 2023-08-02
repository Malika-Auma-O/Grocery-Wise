const router = require("express").Router();
const {addFavorite, getAllFavorites, deleteFavorite, getUserFavorites, updateFavorite} = require("../controllers/favoriteController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/user/favorites", verifyToken, addFavorite);
router.get("/favorites", verifyToken, getAllFavorites);
router.delete("/user/favorites/:id", verifyToken, deleteFavorite);
router.get("/user/favorites", verifyToken, getUserFavorites);
router.put("/user/favorites/:id", verifyToken, updateFavorite);

module.exports = router;
  
  
  