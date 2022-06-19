const { db, cs, pgp } = require("./../database");

const queryUsers = async (req, res, next) => {
  let SelectClients = "SELECT * FROM users;";
  db.any(SelectClients)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

module.exports = { queryUsers };
