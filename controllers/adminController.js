const statisticsService = require("../services/statisticsService");
const reservationService = require("../services/reservationService");
const contentService = require("../services/contentService");
const authService = require("../services/authService");

const adminController = {
  dashboard: async (req, res, next) => {
    try {
      const stats = await statisticsService.getDashboardStats();
      res.render("admin/dashboard", { title: "Admin Dashboard", stats });
    } catch (err) {
      next(err);
    }
  },
  users: async (req, res, next) => {
    try {
      const users = await authService.listUsers();
      res.render("admin/users", { title: "Users", users });
    } catch (err) {
      next(err);
    }
  },
  reservations: async (req, res, next) => {
    try {
      const reservations = await reservationService.listAllReservations();
      res.render("admin/reservations", { title: "Reservations", reservations });
    } catch (err) {
      next(err);
    }
  },
  schedule: (req, res) => {
    res.render("admin/schedule", { title: "Schedule" });
  },
  content: async (req, res, next) => {
    try {
      const content = await contentService.getAllContent();
      res.render("admin/content", { title: "Content", content });
    } catch (err) {
      next(err);
    }
  },
  stats: async (req, res, next) => {
    try {
      const stats = await statisticsService.getDetailedStats();
      res.render("admin/stats", { title: "Stats", stats });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminController;
