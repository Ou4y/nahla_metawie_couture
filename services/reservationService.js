const Reservation = require("../models/Reservation");

const reservationService = {
  createReservation: async (user, payload) => {
    return Reservation.create({
      user_id: user.id,
      ...payload,
    });
  },
  listUserReservations: async (user) => {
    return Reservation.findByUserId(user.id);
  },
  listAllReservations: async () => {
    return Reservation.findAll();
  },
};

module.exports = reservationService;
