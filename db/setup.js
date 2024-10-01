const pool = require("./connection");
const fs = require("fs");
const query = fs.readFileSync("./db/schema.sql", "utf-8");

pool
  .query(query)
  .then((res) => {
    console.log("Create tables success!");
  })
  .catch((e) => {
    console.log(e.message);
  });
