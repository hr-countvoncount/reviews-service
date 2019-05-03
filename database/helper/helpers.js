const sequelize = require("./db.js");

/****************************************/
/****** Sequelize Helper Functions ******/
/****************************************/
const getReviewsFromDatabase = (id, callback) => {
  sequelize
    .query(
      `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response
      FROM users, reviews
      WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id};`
    )
    .then(([results, metadata]) => {
      callback(null, results);
    })
    .catch(err => {
      console.error(err);
    });
};

const getSearchResultsFromDatabase = (id, word, callback) => {
  sequelize
    .query(
      `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response
      FROM users, reviews
      WHERE users.id = reviews.user_id
      AND reviews.apartment_id = ${id}
      AND (reviews.text LIKE '%${word}%' OR reviews.text
      LIKE '% ${word}%');`
    )
    .then(([results, metadata]) => {
      callback(null, results);
    })
    .catch(err => {
      console.err(err);
    });
};

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;
module.exports.getSearchResultsFromDatabase = getSearchResultsFromDatabase;
