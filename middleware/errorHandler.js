const notFoundHandler = (req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).render("error", {
    title: "Something Went Wrong",
    error: err,
  });
};

module.exports = { notFoundHandler, errorHandler };
