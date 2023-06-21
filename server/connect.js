import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aidedschool760##",
  database: "social-app",
});

export default db;
