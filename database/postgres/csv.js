const fs = require("fs");
const faker = require("faker");
const csv = require("fast-csv");

let userId = 1;
let reviewId = 1;
let apartmentId = 1;

const createUsers = () => {
  let users = [];

  for (let i = 0; i < 10000000; i++) {
    users.push({
      id: userId,
      name: faker.name.firstName(),
      avatar: faker.internet.avatar()
    });

    userId++;
  }

  return users;
};

const createReviews = async () => {
  let reviews = [];

  for (let i = 0; i < 10000000; i++) {
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

  return reviews;
};

const createApartments = async () => {
  let apartments = [];

  for (let i = 0; i < 10000000; i++) {
    apartments.push({
      id: apartmentId,
      address:
        faker.address.streetAddress() +
        " " +
        faker.address.city() +
        " " +
        faker.address.stateAbbr() +
        " " +
        faker.address.zipCode(),
      owned_by_user_id: apartmentId
    });

    apartmentId++;
  }

  return apartments;
};

csv.writeToStream(fs.createWriteStream("reviews.csv"), createReviews(), {
  headers: true
});