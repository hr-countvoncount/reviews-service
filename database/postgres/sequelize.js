const Sequelize = require("sequelize");
const faker = require("faker");
const sequelize = new Sequelize("reviews", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false
});

// Schemas
const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["id"]
    //   }
    // ]
  }
);

const Review = sequelize.define(
  "review",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    date: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING(1000)u
    },
    rating: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    apartment_id: {
      type: Sequelize.INTEGER
    },
    has_response: {
      type: Sequelize.BOOLEAN
    },
    owner_response: {
      type: Sequelize.STRING(1000)
    }
  },
  {
    timestamps: false
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["id"]
    //   }
    // ]
  }
);

// Counter variables
let batchCount = 0;
let userId = 1;
let reviewId = 1;

// Creates an array of 1000 objects and inserts it into the appropriate table
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

  return User.bulkCreate(users, {
    ignoreDuplicates: true,
    validate: false
  });
};

// Creates an array of 5000 objects and inserts it into the appropriate table
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

  return Review.bulkCreate(reviews, {
    ignoreDuplicates: true,
    validate: false
  });
};

const insertALotOfRecords = async () => {
  if (batchCount < 10000) {
    batchCount++;
    Promise.all([createUsers(), createReviews()]).then(() => {
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
