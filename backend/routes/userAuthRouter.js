const router = require("express").Router();
const { signUp, login, verify } = require("../controllers/userAuthController");

router.post("/signup", signUp);
router.post("/login", login );
router.post("/verify", verify );

module.exports = router