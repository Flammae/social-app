const jwt = require("jsonwebtoken");
const mongo = require("./mongo");
const { ObjectID } = require("mongodb");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;

// look for token in every request;
// if presented, parse it and put it inside req.userId
exports.verifyToken = (req, res, next) => {
  const header = req.get("authorization");
  req.userId = "";
  if (header) {
    const [bearer, token] = header.split(" ");

    if (bearer !== "bearer" || !token) return next();

    jwt.verify(token, secret, (err, authData) => {
      if (err) {
        return res.redirect("/login");
      } else {
        req.userId = authData.id;
      }
    });
  }
  next();
};

// look for userId in request;
// if presented move to next middleware, if not do one of the specified actions.
exports.isAuthenticated = failureAction => (req, res, next) => {
  failureAction = failureAction || "sendStatus";
  const failureActions = {
    sendStatus: () => res.status(422).end(),
    redirect: () => res.redirect("/login")
  };
  if (req.userId) {
    next();
  } else {
    failureActions[failureAction]();
  }
};

// validations for register route
exports.validateRegister = [
  body("email")
    .isEmail()
    .withMessage("please provide a valid email")
    .normalizeEmail(),
  body("firstName")
    .isLength({ min: 1 })
    .withMessage("please provide your firstname"),
  body("lastName")
    .isLength({ min: 1 })
    .withMessage("please provide your lastname"),
  body("age")
    .isInt()
    .isLength({ min: 1 })
    .withMessage("please choose your age"),
  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "password must be at least 8 characters and should include digits"
    )
    .matches(/\d/, "g")
    .withMessage(
      "password must be at least 8 characters and should include digits"
    ),
  body("passwordConfirm").custom((value, { req }) => {
    // there's a bug. if I delete first if statement then it outputs error: "cannot read propery then of undefined"
    if (!req.body.password) {
      throw new Error(
        "password must be at least 8 characters and should include digits"
      );
    }
    if (value !== req.body.password) {
      console.log("not equal");
      throw new Error("Password confirmation does not match password");
    } else {
      return value;
    }
  })
];

exports.register = async (req, res, next) => {
  const { users } = mongo.getDb();
  const { email, password } = req.body;

  // validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // return error if user already exists
  const user = await users.findOne({ email });
  if (user) {
    return res.status(422).json({
      errors: [
        {
          param: "general",
          msg: "a user with specified email already exists"
        }
      ]
    });
  }

  // hash the password
  req.body.password = await bcrypt.hash(password, 10);

  // save user
  const { passwordConfirm, ...rest } = req.body;
  const r = await users.insertOne(rest);
  const newUser = r.ops[0];

  // send jwt and user object
  jwt.sign({ id: newUser._id }, secret, (err, token) => {
    if (err) next(err);
    res.json({ token });
  });
};

// validation for login route
exports.validateLogin = [
  body("email")
    .isEmail()
    .withMessage("please provide a valid email"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("please provide password")
];

exports.login = async (req, res, next) => {
  console.log("reached");
  const { users } = mongo.getDb();
  const { email, password } = req.body;

  console.log(req.body);

  // validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // find if user exists
  const user = await users.findOne({ email });
  if (!user) {
    return res.status(422).json({
      errors: [
        {
          param: "general",
          msg: "user with this credentials does not exist"
        }
      ]
    });
  }

  // compare passwords with bcrypt
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(422).json({
      errors: [
        {
          param: "general",
          msg: "incorrect password"
        }
      ]
    });
  }

  // create token and return it with user object
  jwt.sign({ id: user._id }, secret, (err, token) => {
    if (err) next(err);
    res.json({ token });
  });
};
