const Sequelize = require("sequelize");
const { createUsers, createReviews } = require("./helper/generators.js");

/**********************************************************/
/****** Sequelize AWS (Pick either AWS or localhost) ******/
/**********************************************************/
const sequelize = new Sequelize("reviews", "postgres", "pass123", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false
});

/****************************************************************/
/****** Sequelize localhost (Pick either AWS or localhost) ******/
/****************************************************************/
// const sequelize = new Sequelize("reviews", null, null, {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false
// });

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
