const pgp = require("pg-promise")();
// const dbconnect = process.env.DATABASE_URL;
const dbconnect =
  "postgres://jnugzstmzceebb:6ea348aaecf66c6e423c493f7f0c49357d25cebd067c6d56571671fd04731f21@ec2-54-167-152-185.compute-1.amazonaws.com:5432/dbqleakp025kcm";
const db = pgp({
  connectionString: dbconnect,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
