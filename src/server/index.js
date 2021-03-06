require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {db, cs, pgp} = require("./database");
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
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
// const contentSecurityPolicy = [
//   "script-src 'unsafe-inline' 'self' " + scriptSrcUrls.join(" "),
//   "style-src 'self' " + styleSrcUrls.join(" "),
//   "img-src 'self' " + styleSrcUrls.join(" "),
// ].join(";");

// // CSP headers
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", contentSecurityPolicy);
//   next();
// });


// app.use((req, res, next) => {
//   // nonce should be base64 encoded
//   res.locals.styleNonce = Buffer.from(uuidv4()).toString('base64')
//   console.log(res.locals.styleNonce)
//   next()
// })

// app.get('/', (req, res) => {
//   res.render('index', {styleNonce: res.locals.styleNonce})
// })

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       "script-src":["'self'", "https://sprouts-control-center.herokuapp.com"],
//       "img-src": ["'self'", "https://sprouts-control-center.herokuapp.com"],
//       "style-src": ["'self'"]
//     }
//   })
// )
// TODO: setup cors and csp to be secure
app.use(function (req, res, next) {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
  next()
})


// Cors
app.use(cors());
app.use(cookieParser());
app.use(express.json());




app.get("/auth/jwt", controller.check);

app.post("/auth/login", controller.signin);

app.get("/clients", (req, res) => {
  let SelectClients = "SELECT * FROM clients;";
  db.any(SelectClients).then((data) => {
    res.send(data);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500)
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
  app.get("google", function (req, res) {
    res.sendFile(path.join(__dirname, "../../build", "googleca74e0ae9841e07d.html"));
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

app.get("/alljobdata", (req, res) => {
  const getData = new ParameterizedQuery({text: 'SELECT * FROM jobs LEft JOIN clients ON jobs.client_id = clients.client_id'});
  db.manyOrNone(getData).then((data) => {
    // console.log(data)
    res.send(data);
  }).catch((err) => {
    console.log(err);
  })

})


// updates database on update
app.put("/sortupdate", (req, res) => {
  let jobList = req.body.job_order;
  if (jobList.length != 0){
    const query = pgp.helpers.update(jobList, cs) + ' WHERE v.job_id = t.job_id' ;
    db.none(query).then(()=> {
      res.sendStatus(200);
    }).catch((err) => {
      res.send(err);
    });
  }else{
    res.sendStatus(300);
  }
})

//TODO: ErrorChecking
app.put("/finishjob", (req, res) => {
  let item = req.body.item
  const updateStatus = new ParameterizedQuery({text: 'UPDATE Jobs set status = $1 WHERE job_id = $2', values:[item.status ,item.job_id]});
  console.log(updateStatus);
  db.none(updateStatus).then(()=> {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500)
  });
});

app.post("/newclient", (req, res) => {
  let data = req.body.data;
  
  const newClient = new ParameterizedQuery({text: 'INSERT INTO clients (client_name, addr, phone_num, email, sprinklers, date_added) VALUES($1,$2,$3,$4,$5,$6)', values:[data.clientName, data.clientAddress, data.clientNumber, data.clientEmail, data.clientSprinkler, new Date]}); 
  console.log(newClient)
  db.none(newClient).then(()=> {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500)
  });
});


app.put("/newquote", (req, res)=> {
  console.log(req.body);
  let data = req.body; 
  const newClient = new ParameterizedQuery({text: 'INSERT INTO jobs (client_id, book_date, quote, job_description, status) VALUES($1,$2,$3,$4,$5)', values:[data.client, data.bookDate, data.Quote, data.descr, false]}); 
  db.none(newClient).then(()=> {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500)
  });
});

app.get("/employee", (req, res) => {
  const getEmployee = new ParameterizedQuery({text: 'SELECT * FROM employee'});
  db.any(getEmployee).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
})

app.get("/timesheet", (req, res) => {
  const getTimeSheet = new ParameterizedQuery({text: 'SELECT * FROM timesheet'});
  db.any(getTimeSheet).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
})

app.listen(PORT);

// shows unhandled rejections when they appear
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
