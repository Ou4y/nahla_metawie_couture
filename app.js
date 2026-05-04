const path = require("path");
require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("./middleware/flash");

const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const { attachCurrentUserToLocals } = require("./middleware/authMiddleware");
const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-me",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(attachCurrentUserToLocals);

app.use("/", routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
