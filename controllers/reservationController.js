const reservationService = require("../services/reservationService");

const reservationController = {
  getNewReservation: (req, res) => {
    res.render("reservations/new", { title: "New Reservation" });
  },
  createReservation: async (req, res, next) => {
    try {
      await reservationService.createReservation(req.session.user, req.body);
      req.flash("success", "Reservation request submitted.");
      res.redirect("/reservations/mine");
    } catch (err) {
      next(err);
    }
  },
  listMyReservations: async (req, res, next) => {
    try {
      const reservations = await reservationService.listUserReservations(
        req.session.user
      );
      res.render("reservations/mine", {
        title: "My Reservations",
        reservations,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = reservationController;
