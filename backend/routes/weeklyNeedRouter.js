const router = require("express").Router();
const {addWeeklyNeed, getAllWeeklyNeeds, deleteWeeklyNeed, getUserWeeklyNeeds, updateWeeklyNeed} = require("../controllers/weeklyNeedController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/user/weekly", verifyToken, addWeeklyNeed);
router.get("/weekly", verifyToken, getAllWeeklyNeeds);
router.delete("/user/weekly/:id", verifyToken, deleteWeeklyNeed);
router.get("/user/weekly", verifyToken, getUserWeeklyNeeds);
router.put("/user/weekly/:id", verifyToken, updateWeeklyNeed);

module.exports = router;
  
  



