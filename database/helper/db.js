/*********************/
/****** pg-pool ******/
/*********************/
const Pool = require("pg-pool");

/*************************/
/****** pg-pool AWS ******/
/*************************/
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

/*******************************/
/****** pg-pool localhost ******/
/*******************************/
// const pool = new Pool({
//   database: "reviews",
//   host: "localhost"
// });

pool.connect((err, client) => {
  console.log("Connected to Postgres.");
});

/***********************/
/****** Sequelize ******/
/***********************/
// const Sequelize = require("sequelize");

/***************************/
/****** Sequelize AWS ******/
/***************************/
// const sequelize = new Sequelize(
//   `${process.env.DB_DBNAME}`,
//   `${process.env.DB_USERNAME}`,
//   `${process.env.DB_PASSWORD}`,
//   {
//     host: `${process.env.DB_HOST}`,
//     dialect: `${process.env.DB_DIALECT}`,
//     port: `${process.env.DB_PORT}`,
//     logging: false,
//     pool: {
//       max: 100,
//       min: 0
//     }
//   }
// );

/*********************************/
/****** Sequelize localhost ******/
/*********************************/
// const sequelize = new Sequelize("reviews", null, null, {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
//   pool: {
//     max: 70
//   }
// });

module.exports = pool;
// module.exports = sequelize
