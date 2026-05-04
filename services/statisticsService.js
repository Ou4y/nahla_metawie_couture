const statisticsService = {
  getDashboardStats: async () => {
    return {
      reservationsToday: 0,
      pendingReservations: 0,
      notificationsSent: 0,
    };
  },
  getDetailedStats: async () => {
    return {
      reservationsByType: {},
      notificationsByChannel: {},
    };
  },
};

module.exports = statisticsService;
