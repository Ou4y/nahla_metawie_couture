const publicController = {
  home: (req, res) => {
    res.render("home", { title: "Nahla Couture" });
  },
  about: (req, res) => {
    res.render("about", { title: "About" });
  },
  collections: (req, res) => {
    res.render("collections", { title: "Collections" });
  },
  gallery: (req, res) => {
    res.render("gallery", { title: "Collection Details" });
  },
  contact: (req, res) => {
    res.render("contact", { title: "Contact" });
  },
  designSystem: (req, res) => {
    res.render("design-system", { title: "Design System" });
  },
};

module.exports = publicController;
