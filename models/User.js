const pool = require("../config/db");

class User {
  static async findById(id) {
    if (!id) {
      return null;
    }

    const [rows] = await pool.execute(
      "SELECT id, email, role, first_name, last_name, phone, created_at, updated_at FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    return rows[0] || null;
  }

  static async findByEmail(email) {
    if (!email) {
      return null;
    }

    const [rows] = await pool.execute(
      "SELECT id, email, password_hash, role, first_name, last_name, phone, created_at, updated_at FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    return rows[0] || null;
  }

  static async findAll() {
    const [rows] = await pool.execute(
      "SELECT id, email, role, first_name, last_name, phone, created_at FROM users ORDER BY id DESC"
    );

    return rows;
  }

  static async create(payload) {
    const {
      email,
      password_hash,
      role = "client",
      first_name,
      last_name,
      phone = null,
    } = payload;

    const [result] = await pool.execute(
      "INSERT INTO users (email, password_hash, role, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [email, password_hash, role, first_name, last_name, phone]
    );

    return {
      id: result.insertId,
      email,
      role,
      first_name,
      last_name,
      phone,
    };
  }
}

module.exports = User;
