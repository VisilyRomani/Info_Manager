const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ParameterizedQuery } = require("pg-promise");

exports.reg = (req, res) => {
  let { username, password, firstName, lastName } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    db.db
      .none(
        "INSERT INTO users(username, password, first_name, last_name) VALUES(${username},${password},${first_name},${last_name})",
        {
          username: username,
          password: hash,
          first_name: firstName,
          last_name: lastName,
        }
      )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(err);
      });
  });
};

exports.check = (req, res) => {
  try {
    let JWTverify = jwt.verify(req.cookies.token, process.env.JWTSECRET);
    if (JWTverify) {
      res.status(200).send(true);
    } else {
      res.status(404).send(false);
    }
  } catch (err) {
    res.send(false);
  }
};

exports.signin = (req, res) => {
  let { username, password } = req.body;
  let verifyQuery = new ParameterizedQuery({
    text: "SELECT * FROM users WHERE username = $1",
    values: username,
  });

  db.db
    .query(verifyQuery)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "user not found" });
      }
      let validPass = bcrypt.compareSync(password, data[0].password);
      if (!validPass) {
        return res.status(401).send({
          accessToken: null,
          message: " - Login or password is invalid.",
        });
      } else {
        let token = jwt.sign({ id: data.user_id }, process.env.JWTSECRET, {
          expiresIn: 900,
        });
        res.cookie("token", token);
        res.json({ token });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};