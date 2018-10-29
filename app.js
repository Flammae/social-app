// stuff to run on development mode
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

const routes = require("./routes");
const mongo = require("./controllers/mongo");
const { verifyToken } = require("./controllers/auth");
const { developmentErrors } = require("./handlers/errorHandlers");

const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// proceed if mongo is connected
app.use(mongo.isConnected);

// get userID from authorization header on every reques
app.use(verifyToken);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

// serve routes
app.use(routes);

// handle errors
if (process.env.NODE_ENV !== "production") {
  app.use(developmentErrors);
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`magic on port ${port}`));
