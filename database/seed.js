const Sequelize = require("sequelize");
const { createUsers, createReviews } = require("./helper/generators.js");

/**********************************************************/
/****** Sequelize AWS (Pick either AWS or localhost) ******/
/**********************************************************/
// const sequelize = new Sequelize(
//   `${process.env.DB_DBNAME}`,
//   `${process.env.DB_USERNAME}`,
//   `${process.env.DB_PASSWORD}`,
//   {
//     host: `${process.env.DB_HOST}`,
//     dialect: `${process.env.DB_DIALECT}`,
//     port: `${process.env.DB_PORT}`
//   }
// );

/****************************************************************/
/****** Sequelize localhost (Pick either AWS or localhost) ******/
/****************************************************************/
const sequelize = new Sequelize("reviews", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false
});

/*******************************/
/****** Sequelize Models  ******/
/*******************************/
const User = require("./models/user.js")(sequelize, Sequelize);
const Review = require("./models/review.js")(sequelize, Sequelize);

/*****************************/
/****** Seeding Script  ******/
/*****************************/
let userCount = 0;
let reviewCount = 0;

const insertALotOfRecords = async () => {
  if (userCount < 100) {
    userCount++;
    createUsers(User)
      .then(() => {
        insertALotOfRecords();
      })
      .catch(err => {
        console.log("Error! ", err);
      });
  } else if (reviewCount < 500) {
    reviewCount++;
    createReviews(Review)
      .then(() => {
        insertALotOfRecords();
      })
      .catch(err => {
        console.log("Error! ", err);
      });
  } else {
    console.timeEnd("dbsave");
  }
};

sequelize.sync({ force: true }).then(() => {
  insertALotOfRecords();
});
