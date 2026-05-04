const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash("error", "Please log in to continue.");
  return res.redirect("/auth/login");
};

const requireGuest = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect("/");
  }
  return next();
};

const requireAdmin = (req, res, next) => {
  const user = req.session && req.session.user;
  if (user && user.role === "admin") {
    return next();
  }
  req.flash("error", "Admin access required.");
  return res.redirect("/");
};

const attachCurrentUserToLocals = (req, res, next) => {
  const user = req.session && req.session.user ? req.session.user : null;
  res.locals.currentUser = user;
  res.locals.isAuthenticated = Boolean(user);
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
};

module.exports = {
  requireAuth,
  requireGuest,
  requireAdmin,
  attachCurrentUserToLocals,
};
