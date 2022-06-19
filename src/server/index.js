require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db, cs, pgp } = require("./database");
const { limit } = require("express-limit");
const app = express();
const origins = [
  "https://sprouts-control-center.herokuapp.com",
  "http://localhost:3000",
  "http://localhost:6000",
];
const controller = require("./db/authController");
const users = require("./db/sprouts_users");
const jobs = require("./db/sprouts_jobs");
const clients = require("./db/sprouts_client");

const { ParameterizedQuery } = require("pg-promise");

// TODO: setup cors and csp to be secure
app.use(function (req, res, next) {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

// Cors
app.use(cors());
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static(path.join(__dirname, "../../build")));

  // Express serve up index.html file if it doesn't recognize route
  app.get(
    "*",
    limit({
      max: 100,
      period: 60 * 1000,
    }),
    function (_req, res) {
      res.sendFile(path.join(__dirname, "../../build", "index.html"));
    }
  );
}

app.get("/auth/jwt", controller.check);
app.post("/auth/login", controller.signin);
app.post("/auth/register", controller.reg);

// // TODO: change clientts to users
// app.post("/queryUsers", users.queryUsers);

// app.post("/jobdata", jobs.jobdata);
// app.get("/alljobdata", jobs.alljobdata);
// app.put("/sortupdate", jobs.sortJobs);
// app.put("/finishjob", jobs.finishJob);

// app.post("/newclient", (req, res) => {
//   let data = req.body.data;
//   const newClient = new ParameterizedQuery({
//     text: "INSERT INTO clients (client_name, addr, phone_num, email, sprinklers, date_added) VALUES($1,$2,$3,$4,$5,$6)",
//     values: [
//       data.clientName,
//       data.clientAddress,
//       data.clientNumber,
//       data.clientEmail,
//       data.clientSprinkler,
//       new Date(),
//     ],
//   });
//   console.log(newClient);
//   db.none(newClient)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.sendStatus(500);
//     });
// });

// app.put("/newquote", (req, res) => {
//   console.log(req.body);
//   let data = req.body;
//   const newClient = new ParameterizedQuery({
//     text: "INSERT INTO jobs (client_id, book_date, quote, job_description, status) VALUES($1,$2,$3,$4,$5)",
//     values: [data.client, data.bookDate, data.Quote, data.descr, false],
//   });
//   db.none(newClient)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.sendStatus(500);
//     });
// });

app.listen(PORT);

// shows unhandled rejections when they appear
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
