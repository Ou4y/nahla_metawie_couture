const authService = require("../services/authService");

const authController = {
  getRegister: (req, res) => {
    res.render("auth/register", { title: "Create Account" });
  },
  postRegister: async (req, res, next) => {
    try {
      await authService.registerUser(req.body);
      req.flash("success", "Account created. Please log in.");
      res.redirect("/auth/login");
    } catch (err) {
      if (err && (err.status === 400 || err.status === 409)) {
        req.flash("error", err.message);
        return res.redirect("/auth/register");
      }
      next(err);
    }
  },
  getLogin: (req, res) => {
    res.render("auth/login", { title: "Log In" });
  },
  postLogin: async (req, res, next) => {
    try {
      const user = await authService.loginUser(req.body);
      if (!user) {
        req.flash("error", "Invalid credentials.");
        return res.redirect("/auth/login");
      }
      req.session.user = user;
      return res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
  postLogout: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },
};

module.exports = authController;
