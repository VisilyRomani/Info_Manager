const db = require("./database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.reg = (req, res) => {
  // console.log(req.body)
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    db.none(
      "INSERT INTO users(username, password) VALUES(${username},${password})",
      { username: req.body.username, password: hash }
    );
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

  db.query("SELECT * FROM users WHERE username = '" + username + "'")
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
