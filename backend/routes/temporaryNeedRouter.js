const router = require("express").Router();
const {addTemporaryNeed, getAllTemporaryNeeds, deleteTemporaryNeed, getUserTemporaryNeeds} = require("../controllers/temporaryNeedController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/temporary", verifyToken, addTemporaryNeed);
router.get("/temporary", verifyToken, getAllTemporaryNeeds);
router.delete("/temporary/:id", verifyToken, deleteTemporaryNeed);
router.get("/user/temporary/", verifyToken, getUserTemporaryNeeds);

module.exports = router;
  
  



