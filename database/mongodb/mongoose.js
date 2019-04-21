const mongoose = require("mongoose");
const faker = require("faker");
mongoose.connect("mongodb://localhost/reviews", { useNewUrlParser: true });

// Schema
const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  avatar: String
});

const reviewSchema = new mongoose.Schema({
  id: Number,
  date: String,
  text: String,
  rating: Number,
  user_id: Number,
  apartment_id: Number,
  has_response: Boolean,
  owner_response: String
});

// Models
const User = mongoose.model("User", userSchema);
const Review = mongoose.model("Review", reviewSchema);

// Counter variables
let userCount = 0;
let reviewCount = 0;
let userId = 1;
let reviewId = 1;

// Creates an array of 1000 objects and inserts it into the appropriate Collection
const createUsers = () => {
  let users = [];

  for (let i = 0; i < 1000; i++) {
    users.push({
      id: userId,
      name: faker.name.firstName(),
      avatar: faker.internet.avatar()
    });

    userId++;
  }

  return User.insertMany(users);
};

// Creates an array of 1000 objects and inserts it into the appropriate Collection
const createReviews = () => {
  let reviews = [];

  for (let i = 0; i < 5000; i++) {
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
        max: 100
      }),
      has_response: Math.random() > 0.66,
      owner_response: faker.lorem.sentences(Math.ceil(Math.random() * 4))
    });

    reviewId++;
  }

  return Review.insertMany(reviews);
};

// Will continuously run batch-inserts
const insertALotOfDocuments = async () => {
  if (userCount < 10000) {
    userCount++;
    createUsers().then(() => {
      insertALotOfDocuments();
    });
  } else if (reviewCount < 10000) {
    reviewCount++;
    createReviews().then(() => {
      insertALotOfDocuments();
    });
  } else {
    console.timeEnd("dbsave");
  }
};

console.time("dbsave");
// insertALotOfDocuments();

module.exports.User = User;
module.exports.Review = Review;
