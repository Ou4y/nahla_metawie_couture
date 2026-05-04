const pool = require("../config/db");

class WebsiteContent {
  static async findAll() {
    return [];
  }

  static async findBySlug(slug) {
    return null;
  }

  static async updateBulk(payload) {
    return null;
  }
}

module.exports = WebsiteContent;
