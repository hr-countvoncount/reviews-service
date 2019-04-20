const Sequelize = require("sequelize");
const sequelize = new Sequelize("reviews", null, null, {
  host: "localhost",
  dialect: "postgres"
});

const getReviewsFromDatabase = (id, callback) => {
  console.log("make it here");
  sequelize
    .query(
      `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response 
      FROM users, reviews 
      WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id} 
      LIMIT 10;`
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
      LIKE '% ${word}%')
      LIMIT 10;`
    )
    .then(([results, metadata]) => {
      callback(null, results);
    });
};

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;
module.exports.getSearchResultsFromDatabase = getSearchResultsFromDatabase;

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
