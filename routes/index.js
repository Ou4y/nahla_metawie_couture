const express = require("express");
const publicController = require("../controllers/publicController");
const authRoutes = require("./authRoutes");
const reservationRoutes = require("./reservationRoutes");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.get("/", publicController.home);
router.get("/about", publicController.about);
router.get("/collections", publicController.collections);
router.get("/gallery", publicController.gallery);
router.get("/contact", publicController.contact);
router.get("/design-system", publicController.designSystem);

router.use("/auth", authRoutes);
router.use("/reservations", reservationRoutes);
router.use("/admin", adminRoutes);


module.exports = router;
