const bcrypt = require("bcrypt");
const User = require("../models/User");

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

const normalizeString = (value) =>
  typeof value === "string" ? value.trim() : "";

const normalizeEmail = (value) => normalizeString(value).toLowerCase();

const buildError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const authService = {
  registerUser: async (payload) => {
    const first_name = normalizeString(payload && payload.first_name);
    const last_name = normalizeString(payload && payload.last_name);
    const email = normalizeEmail(payload && payload.email);
    const password =
      payload && typeof payload.password === "string" ? payload.password : "";
    const phone = normalizeString(payload && payload.phone) || null;

    if (!first_name || !last_name || !email || !password) {
      throw buildError("Please fill in all required fields.", 400);
    }

    const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    try {
      return await User.create({
        email,
        password_hash,
        role: "client",
        first_name,
        last_name,
        phone,
      });
    } catch (err) {
      if (err && err.code === "ER_DUP_ENTRY") {
        throw buildError("An account with that email already exists.", 409);
      }
      throw err;
    }
  },
  loginUser: async (payload) => {
    const email = normalizeEmail(payload && payload.email);
    const password =
      payload && typeof payload.password === "string" ? payload.password : "";

    if (!email || !password) {
      return null;
    }

    const user = await User.findByEmail(email);
    if (!user) return null;
    const passwordOk = await bcrypt.compare(
      password,
      user.password_hash || ""
    );
    if (!passwordOk) return null;
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  },
  listUsers: async () => {
    return User.findAll();
  },
};

module.exports = authService;
