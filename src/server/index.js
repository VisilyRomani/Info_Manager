require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {db, cs, pgp} = require("./database");
const app = express();
const origins = [
  "https://sprouts-control-center.herokuapp.com",
  "http://localhost:3000",
  "http://localhost:6000",
];
const controller = require("./authController");
const { ParameterizedQuery } = require("pg-promise");
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

// TODO: Create all new functions inside database for database things to grab from here

app.get("/auth/jwt", controller.check);

app.post("/auth/login", controller.signin);

app.get("/clients", (req, res) => {
  let SelectClients = "SELECT * FROM clients;";
  db.any(SelectClients).then((data) => {
    res.send(data);
  });
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


app.post("/jobdata", (req, res) => {
  let reqData = req.body.date;
  const getData = new ParameterizedQuery({text: 'SELECT * FROM jobs FULL OUTER JOIN clients ON clients.client_id = jobs.client_id WHERE book_date = $1', values:reqData});
  if(reqData != null){
    db.any(getData).then((data)=> {
        res.send(data);
    }).catch((err) => {
      console.log(err)
    })
  }
})


app.post("/sortupdate", (req, res) => {
  let jobList = req.body.job_order;

  if (jobList.length != 0){
    // const cs = new pgp.helpers.ColumnSet(['sort_int'], {table:'jobs'});
    const query = pgp.helpers.update(jobList, cs) + ' WHERE v.job_id = t.job_id' ;
    db.none(query);
  }
})

app.listen(PORT);

// shows unhandled rejections when they appear
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
