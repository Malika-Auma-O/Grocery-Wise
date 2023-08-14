const router = require("express").Router();

const {contactUs, getContacts} = require("../controllers/contactController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/contact", contactUs);
router.get("/contact", verifyToken, getContacts);

module.exports = router;
