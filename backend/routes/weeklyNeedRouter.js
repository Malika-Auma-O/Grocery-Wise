const router = require("express").Router();
const {addWeeklyNeed, getAllWeeklyNeeds, deleteWeeklyNeed, getUserWeeklyNeeds} = require("../controllers/weeklyNeedController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/weekly", verifyToken, addWeeklyNeed);
router.get("/weekly", verifyToken, getAllWeeklyNeeds);
router.delete("/weekly/:id", verifyToken, deleteWeeklyNeed);
router.get("/user/weekly/", verifyToken, getUserWeeklyNeeds);

module.exports = router;
  
  



