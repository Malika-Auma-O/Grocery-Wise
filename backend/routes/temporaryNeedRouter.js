const router = require("express").Router();
const {addTemporaryNeed, getAllTemporaryNeeds, deleteTemporaryNeed, getUserTemporaryNeeds, updateTemporaryNeed} = require("../controllers/temporaryNeedController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/user/temporary", verifyToken, addTemporaryNeed);
router.get("/temporary", verifyToken, getAllTemporaryNeeds);
router.delete("/user/temporary/:id", verifyToken, deleteTemporaryNeed);
router.get("/user/temporary", verifyToken, getUserTemporaryNeeds);
router.put("/user/temporary/:id", verifyToken, updateTemporaryNeed);

module.exports = router;
  
  




  
  



