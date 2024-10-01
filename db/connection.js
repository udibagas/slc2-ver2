const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "simulasi-livecode",
  idleTimeoutMillis: 100,
});

module.exports = pool; // ! yang di export adalah instance dari Pool (pool). Bukan class Pool
