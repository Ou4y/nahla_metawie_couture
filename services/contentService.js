const WebsiteContent = require("../models/WebsiteContent");

const contentService = {
  getAllContent: async () => {
    return WebsiteContent.findAll();
  },
  getContentBySlug: async (slug) => {
    return WebsiteContent.findBySlug(slug);
  },
  updateContent: async (payload) => {
    return WebsiteContent.updateBulk(payload);
  },
};

module.exports = contentService;
