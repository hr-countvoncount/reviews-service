const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "sdc2"
});

pool.query("SELECT * FROM users").then(res => {
  console.log(res.rows[0]);
});

/*
const pgp = require("pg-promise")();
const faker = require("faker");

const cn = {
  host: "localhost",
  port: 5432,
  database: "sdc2"
};

const db = pgp(cn);

const userSchema = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER NOT NULL,
  name VARCHAR(50) NULL DEFAULT NULL,
  avatar VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);`;

let userId = 1;
let batchCount = 0;

const createUsers = () => {
  for (let i = 0; i < 1000; i++) {
    db.query(
      "INSERT INTO users(id, name, avatar) VALUES (${id}, ${name}, ${avatar})",
      {
        id: userId,
        name: faker.name.firstName(),
        avatar: faker.internet.avatar()
      }
    );
    userId++;
  }
};

const userPromise = () => {
  return new Promise(createUsers());
};

const insertALotOfRecords = () => {
  userPromise().then(() => {
    insertALotOfRecords();
  });
};

db.none(userSchema).then(() => {
  insertALotOfRecords();
});
*/
