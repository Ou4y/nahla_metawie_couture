const NotificationLog = require("../models/NotificationLog");

const notificationService = {
  logNotification: async (payload) => {
    return NotificationLog.create(payload);
  },
};

module.exports = notificationService;
