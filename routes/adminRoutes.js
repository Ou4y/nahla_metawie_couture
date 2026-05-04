const express = require("express");
const adminController = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(requireAdmin);

router.get("/dashboard", adminController.dashboard);
router.get("/users", adminController.users);
router.get("/reservations", adminController.reservations);
router.get("/schedule", adminController.schedule);
router.get("/content", adminController.content);
router.get("/stats", adminController.stats);

module.exports = router;
