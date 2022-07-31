const mysql = require("mysql2");
const bcrtpt = require("bcrypt");
const { result } = require("lodash");
const dbConfig = require('../config/dbConfig')
const saltRounds = 10;

const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Register User
//@Router   POST /api/users/register
const registerUser = (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  const userType = req.body.usertype;

  bcrtpt.hash(password, saltRounds, (err, hashedPassword) => {
    if (!err) {
      db.query(
        "INSERT INTO user_credentials (email,password, user_type) VALUES (?,?,?)",
        [username, hashedPassword, userType],
        (err, result) => {
          !err ? res.status(201).json(result) : res.status(400); console.log(err);
        }
      );
    } else {
      console.log(err);
    }
  });

};

// Login User
//@Router   POST /api/users/login
const loginUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user_credentials WHERE email = ?",
    [username],
    (err, result) => {
      if (err) {
        res.json(err);
      }
      if (result.length > 0) {
        bcrtpt.compare(password, result[0].password, (error, reslt) => {
          if(reslt){
            res.status(200).send(result);
          }else{
            res.json({ message: "Invalid User Credentials" });
          }
        })
      } else {
        res.json({ message: "User Does not Exits" });
      }
    }
  );
};

module.exports = {
  loginUser,
  registerUser,
};
