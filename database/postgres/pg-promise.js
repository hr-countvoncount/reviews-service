const pgp = require("pg-promise")({ capSQL: true });
const faker = require("faker");
const db = pgp({
  host: "localhost",
  user: "postgres",
  password: "pass123",
  port: 5432,
  database: "reviews"
});

// let userSchema = new pgp.helpers.ColumnSet(["id", "name", "avatar"], {
//   table: "users"
// });

let reviewSchema = new pgp.helpers.ColumnSet(
  [
    "id",
    "date",
    "text",
    "rating",
    "user_id",
    "apartment_id",
    "has_response",
    "owner_response"
  ],
  {
    table: "reviews"
  }
);

// let userCount = 0;
let reviewCount = 0;
// let userId = 1;
let reviewId = 46659001;

// const createUsers = () => {
//   let users = [];

//   for (let i = 0; i < 1000; i++) {
//     users.push({
//       id: userId,
//       name: faker.name.firstName(),
//       avatar: faker.internet.avatar()
//     });

//     userId++;
//   }

//   return db.none(pgp.helpers.insert(users, userSchema));
// };

const createReviews = () => {
  let reviews = [];

  for (let i = 0; i < 3341; i++) {
    reviews.push({
      id: reviewId,
      date:
        faker.date.month() +
        " " +
        faker.random.number({ min: 2015, max: 2019 }),
      text: faker.lorem.sentences(Math.ceil(Math.random() * 6)),
      rating: Math.floor((() => Math.random() * 5)()) + 0.5,
      user_id: faker.random.number({
        min: 1,
        max: 10000000
      }),
      apartment_id: faker.random.number({
        min: 1,
        max: 10000000
      }),
      has_response: Math.random() > 0.66,
      owner_response: faker.lorem.sentences(Math.ceil(Math.random() * 4))
    });

    reviewId++;
  }

  return db.none(pgp.helpers.insert(reviews, reviewSchema));
};

const insertReviews = () => {
  if (reviewCount < 1000) {
    reviewCount++;
    createReviews().then(() => {
      insertReviews();
    });
  } else {
    console.log("Done seeding!");
  }
};

// const insertUsers = () => {
//   if (userCount < 10000) {
//     userCount++;
//     createUsers().then(() => {
//       insertUsers();
//     });
//   } else {
//     console.log("Done seeding!");
//   }
// };

insertReviews();
