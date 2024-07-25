const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ccihm'
})


/* LOGIN */
const session = express();
session.use(cors());
session.use(express.json());
session.post('/login', (req, res) => {
    const sql = "SELECT *,COUNT(*) as Nbre FROM `users` WHERE email= ? AND password = ?";
    db.query(sql,[req.body.email,req.body.password] , (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

session.post('/register', (req, res) => {
  const sql = "INSERT INTO users(pseudo, email,password,type) VALUES(?)";
  const values = [
    req.body.pseudo,
      req.body.email,
      req.body.password,
      req.body.type
  ]
  db.query(sql, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
  })
})

session.get('/membres', (req, res) => {
  const sql = "SELECT * FROM membres";
  db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
  })
})
session.post('/membres/', (req, res) => {
  const sql = "INSERT INTO membres VALUES(?,?,?,?,?,?,?,?,?)";
  const membre = [
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.telephone,
    req.body.adresse,
    req.body.datenaiss,
    req.body.sexe,
    req.body.dateadhesion
    
  ]
  db.query(sql,[membre], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
  })
})


session.listen(8080, () => {
  console.log("Backend port 8080... ");
})