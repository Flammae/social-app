const dotenv = require("dotenv");
const { MongoClient } = require("mongoDb");
const { format } = require("util");

dotenv.config();

const str = format(
  "mongodb://%s:%s@ds141720.mlab.com:41720/social-app",
  process.env.DB_USER,
  process.env.DB_PASS
);

if (!process.argv[2]) {
  console.log("you forgot to include collection name, you dummy");
  process.exit();
}

let connection;
MongoClient.connect(str, { useNewUrlParser: true })
  .then(res => {
    connection = res;
    const collection = res.db().collection(process.argv[2]);
    return collection.drop();
  })
  .then(() => {
    console.log(`collection: ${process.argv[2]} has been deleted`);
    connection.close();
  })
  .catch(err => {
    console.log(err);
    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log(
      "there has been a problem during deleting the collection. error output above ^"
    );
    connection.close();
  });
