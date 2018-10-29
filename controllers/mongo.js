const { MongoClient } = require("mongodb");
const { format } = require("util");

// ? add or remove collections here
const collections = ["users", "posts", "followers", "following"];

const createMongo = str => {
  let db;

  MongoClient.connect(
    str,
    { useNewUrlParser: true }
  )
    .then(res => {
      console.log("connected to the database");
      db = res.db();
    })
    .catch(err => {
      throw err;
    });

  const isConnected = (req, res, next) => {
    if (db) {
      return next();
    }
    res.send("waiting to connect to the database. come back in a second");
  };

  // usage: const { users } = getDb();
  const getDb = () => {
    // return db.collection(dbName);
    return collections.reduce((obj, name) => {
      obj[name] = db.collection(name);
      return obj;
    }, {});
  };

  return {
    isConnected,
    getDb
  };
};

const mongo = createMongo(
  format(
    "mongodb://%s:%s@ds141720.mlab.com:41720/social-app",
    process.env.DB_USER,
    process.env.DB_PASS
  )
);

module.exports = mongo;
