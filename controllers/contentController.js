const contentService = require("../services/contentService");

const contentController = {
  listContent: async (req, res, next) => {
    try {
      const content = await contentService.getAllContent();
      res.render("admin/content", { title: "Content", content });
    } catch (err) {
      next(err);
    }
  },
  updateContent: async (req, res, next) => {
    try {
      await contentService.updateContent(req.body);
      req.flash("success", "Content updated.");
      res.redirect("/admin/content");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = contentController;
