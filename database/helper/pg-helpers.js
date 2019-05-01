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

const getReviewsFromDatabase = async (id, callback) => {
  try {
    const res = await pool.query(
      `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response
      FROM users, reviews
      WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id};`
    );
    callback(null, res.rows);
  } catch (e) {
    console.log(e);
  }
};

const getSearchResultsFromDatabase = async (id, word, callback) => {
  try {
    const res = await pool.query(
      `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response
      FROM users, reviews
      WHERE users.id = reviews.user_id
      AND reviews.apartment_id = ${id}
      AND (reviews.text LIKE '%${word}%' OR reviews.text
      LIKE '% ${word}%');`
    );
    callback(null, res.rows);
  } catch (e) {
    console.log(e);
  }
};

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;
module.exports.getSearchResultsFromDatabase = getSearchResultsFromDatabase;
