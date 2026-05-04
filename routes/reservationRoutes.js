const express = require("express");
const reservationController = require("../controllers/reservationController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/new", requireAuth, reservationController.getNewReservation);
router.post("/", requireAuth, reservationController.createReservation);
router.get("/mine", requireAuth, reservationController.listMyReservations);

module.exports = router;
