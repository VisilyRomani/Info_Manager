const pgp = require("pg-promise")({
  capSQL: true,
});
require("dotenv").config();

const dbconnect = process.env.DATABASE_URL;

const db = pgp({
  connectionString: dbconnect,
  ssl: {
    rejectUnauthorized: false,
  },
});

const cs = new pgp.helpers.ColumnSet(
  ["?job_id", "sort_int", "job_description"],
  { table: "jobs" }
);

exports.db = db;
exports.cs = cs;
exports.pgp = pgp;
