const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin",
});
connection.connect(function (err) {
  if (err) {
    console.log(`database is not connected`);
  } else {
    console.log(`database is connected`);
  }
});

module.exports = connection;
