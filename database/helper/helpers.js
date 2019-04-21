const Sequelize = require("sequelize");
const sequelize = new Sequelize("reviews", null, null, {
  host: "localhost",
  dialect: "postgres"
});

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/reviews", { useNewUrlParser: true });
// const { User, Review } = require("../mongodb/mongoose.js");

// Sequelize
const getReviewsFromDatabase = (id, callback) => {
  sequelize
    .query(
      `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response
      FROM users, reviews
      WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id};`
    )
    .then(([results, metadata]) => {
      callback(null, results);
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
    });
};

// Mongoose
// const getReviewsFromDatabase = (id, callback) => {
//   // console.log("heres the id! ", typeof id);
//   Review.find({ id: +id }, (err, res) => {
//     console.log("heres some res!! ", res);
//   });
// };

// const getSearchResultsFromDatabase = (id, word, callback) => {};

// SQLite
// const getReviewsFromDatabase = (id, callback) => {
//   let db = new sqlite3.Database(path.join(__dirname, "../reviews.db"), err => {
//     if (err) {
//       console.error(err);
//     } else {
//       db.all(
//         `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response FROM users, reviews WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id};`,
//         [],
//         (err, rows) => {
//           if (err) {
//             console.error("Error querying database", err);
//           } else {
//             db.close(() => {
//               callback(null, rows),
//                 console.log("Got reviews and closed database");
//             });
//           }
//         }
//       );
//     }
//   });
// };

// const getSearchResultsFromDatabase = (id, word, callback) => {
//   let db = new sqlite3.Database(path.join(__dirname, "../reviews.db"), err => {
//     if (err) {
//       console.error(err);
//     } else {
//       db.all(
//         `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response FROM users, reviews WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id} AND (reviews.text LIKE '%${word}%' OR reviews.text LIKE '% ${word}%');`,
//         [],
//         (err, rows) => {
//           if (err) {
//             console.error("Error querying database", err);
//           } else {
//             db.close(() => {
//               callback(null, rows),
//                 console.log("Got search results and closed database");
//             });
//           }
//         }
//       );
//     }
//   });
// };

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;
module.exports.getSearchResultsFromDatabase = getSearchResultsFromDatabase;
