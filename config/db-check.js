require('dotenv').config();

const db = require("./db");

(async () => {

  try {

    const [rows] = await db.query('SELECT DATABASE() AS db');

    console.log('Connected successfully:', rows[0]);

    const [tables] = await db.query('SHOW TABLES');

    console.log('Tables found:', tables.length);

    process.exit(0);

  } catch (error) {

    console.error('DB connection failed:', error.message);

    process.exit(1);

  }

})();