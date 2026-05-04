const flash = () => (req, res, next) => {
  if (!req.session) {
    return next(new Error("Flash middleware requires sessions."));
  }

  req.flash = (type, message) => {
    if (!type) {
      return [];
    }

    const store = req.session.flash || (req.session.flash = {});

    if (message === undefined) {
      const messages = store[type] ? store[type].slice() : [];
      delete store[type];
      return messages;
    }

    const nextMessages = Array.isArray(message) ? message : [message];
    store[type] = (store[type] || []).concat(nextMessages);
    return store[type];
  };

  return next();
};

module.exports = flash;
