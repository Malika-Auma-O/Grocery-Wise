const router = require("express").Router();
const { signUp, login, verify, requestPasswordReset, resetPassword } = require("../controllers/userAuthController");

router.post("/signup", signUp);
router.post("/login", login );
router.post("/verify", verify );
router.post("/request-password", requestPasswordReset );
router.post("/reset-password", resetPassword );

module.exports = router
