const Pool = require("pg-pool");

const pool = new Pool({
  user: `${process.env.DB_USERNAME}`,
  host: `${process.env.DB_HOST}`,
  database: `${process.env.DB_DBNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  port: `${process.env.DB_PORT}`,
  max: 100,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// const pool = new Pool({
//   database: "reviews",
//   host: "localhost"
// });

pool.connect((err, client) => {
  console.log("Connected to Postgres.");
});

module.exports = pool;
