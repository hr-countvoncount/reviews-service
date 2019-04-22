const { MongoClient } = require("mongodb");
const faker = require("faker");
const url = "mongodb://localhost:27017";
const dbName = "reviews";

MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
  const db = client.db(dbName);

  // Database Collection names
  const reviewCollection = db.collection("reviews");

  // Counter variables
  let reviewCount = 0;
  let reviewId = 1;

  // Creates an array of 5000 objects and inserts it into the appropriate Collection
  const createReviews = async () => {
    let reviews = [];

    for (let i = 0; i < 5000; i++) {
      reviews.push({
        name: faker.name.firstName(),
        avatar: faker.internet.avatar(),
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

    return reviewCollection.insertMany(reviews);
  };

  const insertALotOfDocuments = () => {
    if (reviewCount < 10000) {
      reviewCount++;
      createReviews().then(() => {
        insertALotOfDocuments();
      });
    } else {
      // await reviewCollection.createIndex({ apartment_id: 1 });
      console.timeEnd("dbsave");
      client.close();
    }
  };

  console.time("dbsave");
  insertALotOfDocuments();
});

// Creates an array of 1000 objects and inserts it into the appropriate Collection
// const createUsers = async () => {
//   let users = [];

//   for (let i = 0; i < 1000; i++) {
//     users.push({
//       id: userId,
//       name: faker.name.firstName(),
//       avatar: faker.internet.avatar()
//     });

//     userId++;
//   }

//   return userCollection.insertMany(users);
// };

// Will continuously run batch-inserts and then create appropriate index
// const insertALotOfDocuments = async () => {
//   if (userCount < 10000) {
//     userCount++;
//     createUsers().then(() => {
//       insertALotOfDocuments();
//     });
//   } else if (reviewCount < 10000) {
//     reviewCount++;
//     createReviews().then(() => {
//       insertALotOfDocuments();
//     });
//   } else {
//     // await userCollection.createIndex({ id: 1 });
//     // await reviewCollection.createIndex({ id: 1 });
//     console.timeEnd("dbsave");
//     client.close();
//   }
// };
