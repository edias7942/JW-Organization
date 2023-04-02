database: "jw-organization"
username: "0sne07cwjouq446ozsn1"
host: "aws.connect.psdb.cloud"
password: "pscale_pw_3bqoWpf0JzoAVDrrBib14FFbSp6EEqgIibHwscxOywJ"

var mysql = require('mysql2');

var conn = mysql.createConnection({
  database: "jw-organization",
  user: "0sne07cwjouq446ozsn1",
  host: "aws.connect.psdb.cloud",
  password: "pscale_pw_3bqoWpf0JzoAVDrrBib14FFbSp6EEqgIibHwscxOywJ",
  ssl: {
    rejectUnauthorized: true
  }
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Succesfully connected to PlanetScale!");
  conn.query("SELECT * FROM DESIGNATIONS2023;", (err, result) => {
    console.log(result)
    console.log("Cheguei aqui!")
  })
});