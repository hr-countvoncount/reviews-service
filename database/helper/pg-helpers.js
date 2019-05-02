const pool = require("./db.js");

const getReviewsFromDatabase = async (id, callback) => {
  try {
    const res = await pool.query(
      `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response
      FROM users JOIN reviews
      ON users.id = reviews.user_id AND reviews.apartment_id = ${id};`
    );
    callback(null, res.rows);
  } catch (err) {
    console.log(err);
  }
};

// const getReviewsFromDatabase = async (id, callback) => {
//   try {
//     const res = await pool.query(
//       `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response
//       FROM users, reviews
//       WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id};`
//     );
//     callback(null, res.rows);
//   } catch (err) {
//     console.log(err);
//   }
// };

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
  } catch (err) {
    console.log(err);
  }
};

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;
module.exports.getSearchResultsFromDatabase = getSearchResultsFromDatabase;
