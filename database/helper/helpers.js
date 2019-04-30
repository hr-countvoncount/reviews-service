const Sequelize = require("sequelize");

/***************************/
/****** Sequelize AWS ******/
/***************************/
const sequelize = new Sequelize(
  `${process.env.DB_DBNAME}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`,
    port: `${process.env.DB_PORT}`,
    logging: false,
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/*********************************/
/****** Sequelize localhost ******/
/*********************************/
// const sequelize = new Sequelize("reviews", null, null, {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false
// });

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
