require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./database");
const app = express();
const origins = [
  "https://sprouts-control-center.herokuapp.com",
  "http://localhost:3000",
  "http://localhost:6000",
];
const controller = require("./authController");
const corsOptions = {
  origin: origins,
  optionsSuccessStatus: 200,
  credentials: true,
};
const scriptSrcUrls = [];
const styleSrcUrls = [];
const contentSecurityPolicy = [
  "script-src 'unsafe-inline' 'self' " + scriptSrcUrls.join(" "),
  "style-src 'self' " + styleSrcUrls.join(" "),
  "img-src 'self' " + styleSrcUrls.join(" "),
].join(";");

// CSP headers
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", contentSecurityPolicy);
  next();
});
// Cors
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get("/auth/jwt", controller.check);

app.post("/auth/login", controller.signin);

app.get("/clients", (req, res) => {
  let SelectClients = "SELECT * FROM clients;";
  db.any(SelectClients).then((data) => {
    console.log(data);
    res.send(data);
  });
});

// TODO: This needs to be inside a socket because i cant put the socket inside the rest api or the rest api inside the socket
app.post("/submitJob", (req, res) => {
  let { client_id, description, quote, date } = req.body;
  let submitJob = `INSERT INTO jobs(job_description, client_id, book_date, quote) VALUES($/description/, $/client_id/, $/date/, $/quote/)`;
  console.log(submitJob);
  console.log( client_id, description, quote, date);
  db.any(submitJob, { client_id, description, quote, date });
  res.send(200);
});

// app.post('/auth/register', controller.reg);

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static(path.join(__dirname, "../../build")));

  // Express serve up index.html file if it doesn't recognize route
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../build", "index.html"));
  });
}

const server = app.listen(PORT);

const io = (module.exports.io = require("socket.io")(server, {
  cors: {
    origins: "*",
  },
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "my-custom-header",
    });
  },
}));

let connectCounter = 0;
io.on("connection", (socket) => {
  console.log(connectCounter);
  connectCounter++;
  let SelectJob = `SELECT * FROM jobs FULL OUTER JOIN clients ON clients.client_id = jobs.client_id WHERE book_date between $1 AND $2`;
  socket.on("pgInit", (dates) => {
    db.any(SelectJob, dates).then((data) => {
      socket.emit("initJobs", data);
      console.log(data);
    });
  });

  socket.on("disconnect", () => {
    socket.removeAllListeners();
    connectCounter--;
  });
});

// shows unhandled rejections when they appear
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
