const { db, cs, pgp } = require("./../database");

const timesheet = (req, res, next) => {
  let startDate = new Date(req.body.startDate);
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() - 7);

  const getTimeSheet = new ParameterizedQuery({
    text: "SELECT * FROM timesheet LEFT JOIN employee USING (employee_id) WHERE start_time BETWEEN SYMMETRIC $1 AND $2",
    values: [endDate, startDate],
  });
  db.any(getTimeSheet)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

// TODO: create single query to update time

const starttime = (req, res) => {
  let [employee, time] = req.body;
  console.log(employee);
  let updateStart = new ParameterizedQuery({
    text: "INSERT INTO timesheet(employee_id, start_time) VALUES($1,$2)",
    values: [employee.value, time],
  });
  db.none(updateStart)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

module.exports = { timesheet };
