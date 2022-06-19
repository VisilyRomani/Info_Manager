const { db, cs, pgp } = require("./../database");

const finishJob = (req, res, next) => {
  let item = req.body.item;
  const updateStatus = new ParameterizedQuery({
    text: "UPDATE Jobs set status = $1 WHERE job_id = $2",
    values: [item.status, item.job_id],
  });
  console.log(updateStatus);
  db.none(updateStatus)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

const sortJobs = (req, res, next) => {
  let jobList = req.body.job_order;
  if (!!jobList.length) {
    const query =
      pgp.helpers.update(jobList, cs) + " WHERE v.job_id = t.job_id";
    db.none(query)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.send(400);
      });
  } else {
    res.sendStatus(300);
  }
};

const jobData = (req, res, next) => {
  let reqData = req.body.date;
  const getData = new ParameterizedQuery({
    text: "SELECT * FROM jobs FULL OUTER JOIN clients ON clients.client_id = jobs.client_id WHERE book_date = $1",
    values: reqData,
  });
  if (reqData != null) {
    db.any(getData)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
alljobdata = (req, res) => {
  const getData = new ParameterizedQuery({
    text: "SELECT * FROM jobs LEFT JOIN clients ON jobs.client_id = clients.client_id",
  });
  db.manyOrNone(getData)
    .then((data) => {
      // console.log(data)
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { finishJob, sortJobs, jobData, alljobdata };
