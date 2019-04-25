const Sequelize = require("sequelize");
const { createUsers, createReviews } = require("./helper/generators.js");

/**********************************************************/
/****** Sequelize AWS (Pick either AWS or localhost) ******/
/**********************************************************/
// const sequelize = new Sequelize("reviews", "postgres", "pass123", {
//   host: "localhost",
//   dialect: "postgres",
//   port: 5432,
//   logging: false
// });

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
  if (userCount < 10) {
    userCount++;
    createUsers(User).then(() => {
      insertALotOfRecords();
    });
  } else if (reviewCount < 50) {
    reviewCount++;
    createReviews(Review).then(() => {
      insertALotOfRecords();
    });
  } else {
    console.timeEnd("dbsave");
  }
};

console.time("dbsave");
sequelize.sync({ force: true }).then(() => {
  insertALotOfRecords();
});
