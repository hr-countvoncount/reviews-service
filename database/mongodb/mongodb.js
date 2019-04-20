const { MongoClient } = require("mongodb");
const faker = require("faker");
const url = "mongodb://localhost:27017";
const dbName = "reviews";

MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
  const db = client.db(dbName);

  // Database Collection names
  const userCollection = db.collection("users");
  const reviewCollection = db.collection("reviews");

  // Counter variables
  let batchCount = 0;
  let userId = 1;
  let reviewId = 1;

  // Creates an array of 1000 objects and inserts it into the appropriate Collection
  const createUsers = async () => {
    let users = [];

    for (let i = 0; i < 1000; i++) {
      users.push({
        id: userId,
        name: faker.name.firstName(),
        avatar: faker.internet.avatar()
      });

      userId++;
    }

    return userCollection.insertMany(users);
  };

  // Creates an array of 5000 objects and inserts it into the appropriate Collection
  const createReviews = async () => {
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
          max: 10000000
        }),
        has_response: Math.random() > 0.66,
        owner_response: faker.lorem.sentences(Math.ceil(Math.random() * 4))
      });

      reviewId++;
    }

    return reviewCollection.insertMany(reviews);
  };

  // Will continuously run batch-inserts and index
  const insertALotOfDocuments = async () => {
    if (batchCount < 10000) {
      batchCount++;
      Promise.all([createUsers(), createReviews()]).then(() => {
        insertALotOfDocuments();
      });
    } else {
      // await userCollection.createIndex({ id: 1 });
      // await reviewCollection.createIndex({ id: 1 });
      console.timeEnd("dbsave");
      client.close();
    }
  };

  console.time("dbsave");
  insertALotOfDocuments();
});
