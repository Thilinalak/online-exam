const dbConfig = require('../config/dbConfig')
const mysql = require('mysql2')

const db  = mysql.createConnection({
  host : dbConfig.HOST,
  user : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB
})


// Login User
//@Router   POST /api/users/login
const loginUser =  (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user_credentials WHERE email = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.send({ message: "Invalid User Credentials" });
       
      }
    }
  );
};

module.exports = {
  loginUser,
};
