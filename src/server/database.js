const pgp = require('pg-promise')();
require('dotenv').config()
const dbconnect = process.env.DATABASE_URL;
// const dbconnect = ;
const db = pgp({
  connectionString: dbconnect,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db


