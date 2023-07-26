const router = require("express").Router();
const {addFavorite, getAllFavorites, deleteFavorite, getUserFavorites} = require("../controllers/favoriteController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/favorites", verifyToken, addFavorite);
router.get("/favorites", verifyToken, getAllFavorites);
router.delete("/favorites/:id", verifyToken, deleteFavorite);
router.get("/user/favorites/", verifyToken, getUserFavorites);

module.exports = router;
  
  
  