const express = require("express");
const authController = require("../controllers/authController");
const { requireGuest, requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/register", requireGuest, authController.getRegister);
router.post("/register", requireGuest, authController.postRegister);
router.get("/login", requireGuest, authController.getLogin);
router.post("/login", requireGuest, authController.postLogin);
router.post("/logout", requireAuth, authController.postLogout);

module.exports = router;
