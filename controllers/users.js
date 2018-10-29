const mongo = require("./mongo");
const { ObjectID } = require("mongodb");

// update followers collection
// update followings collection
// update logged-in user's followingCount
// update other user's followerCount
exports.follow = async (req, res) => {
  console.log("follow reached");
  const { users, followers, following } = mongo.getDb();

  const loggedInUser = ObjectID(req.userId);
  const otherUser = ObjectID(req.params.id);

  const r = await followers.updateOne(
    { user: otherUser },
    {
      $addToSet: {
        followers: loggedInUser
      }
    },
    { upsert: true }
  );
  console.log(r);
  if (r.upsertedCount > 0 || r.modifiedCount > 0) {
    console.log("if reached");
    const updFollowing = following.updateOne(
      { user: loggedInUser },
      {
        $addToSet: {
          following: otherUser
        }
      },
      { upsert: true }
    );

    const updfollowerCount = users.updateOne(
      { _id: otherUser },
      { $inc: { followersCount: 1 } }
    );

    const updFollowingCount = users.updateOne(
      { _id: loggedInUser },
      { $inc: { followingCount: 1 } }
    );

    await Promise.all([updFollowing, updfollowerCount, updFollowingCount]);
    return res.status(200).end();
  } else {
    console.log("else reached");
    return res.status(200).end();
  }
};

exports.unfollow = async (req, res) => {
  const { followers, following, users } = mongo.getDb();

  const loggedInUser = ObjectID(req.userId);
  const otherUser = ObjectID(req.params.id);

  const r = await followers.updateOne(
    { user: otherUser },
    {
      $pull: {
        followers: loggedInUser
      }
    }
  );

  if (r.modifiedCount > 0) {
    const updFollowing = following.updateOne(
      { user: loggedInUser },
      {
        $pull: {
          following: otherUser
        }
      }
    );

    const updfollowerCount = users.updateOne(
      { _id: otherUser },
      { $inc: { followersCount: -1 } }
    );

    const updFollowingCount = users.updateOne(
      { _id: loggedInUser },
      { $inc: { followingCount: -1 } }
    );

    await Promise.all([updFollowing, updfollowerCount, updFollowingCount]);
    return res.status(200).end();
  } else {
    return res.status(200).end();
  }
};

// transform users following refs to actual users and send
exports.getFollowing = async (req, res) => {
  const { following } = mongo.getDb();

  const loggedInUsersFollowing = await following.findOne({
    user: ObjectID(req.userId)
  });

  // res.json(loggedInUsersFollowing);

  const followingDocs = await following
    .aggregate([
      { $match: { user: ObjectID(req.params.id) } },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "following"
        }
      },
      { $unwind: "$following" },
      {
        $project: {
          _id: 0,
          "following._id": 1,
          "following.firstName": 1,
          "following.lastName": 1,
          "following.image": 1,
          "following.age": 1,
          "following.followingCount": 1,
          "following.followersCount": 1,
          "following.followedByUser": {
            $in: ["$following._id", loggedInUsersFollowing.following]
          }
        }
      }
    ])
    .toArray();

  res.json(followingDocs);
};

// transform user's follower refs to actual users and send
exports.getFollowers = async (req, res) => {
  const { followers, following } = mongo.getDb();

  const loggedInUsersFollowing = await following.findOne({
    user: ObjectID(req.userId)
  });

  const followersDocs = await followers
    .aggregate([
      { $match: { user: ObjectID(req.params.id) } },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers"
        }
      },
      { $unwind: "$followers" },
      {
        $project: {
          _id: 0,
          "followers._id": 1,
          "followers.firstName": 1,
          "followers.lastName": 1,
          "followers.image": 1,
          "followers.followersCount": 1,
          "followers.followingCount": 1,
          "followers.age": 1,
          "followers.followedByUser": {
            $in: ["$followers._id", loggedInUsersFollowing.following]
          }
        }
      }
    ])
    .toArray();

  res.json(followersDocs);
};

exports.getUserByToken = async (req, res) => {
  if (!req.userId) return res.status(401).end();

  const { users } = mongo.getDb();

  const query = { _id: ObjectID(req.userId) };
  const projection = { fields: { password: 0 } };
  const user = await users.findOne(query, projection);

  res.json(user);
};

exports.getUserById = async (req, res) => {
  const { users, followers } = mongo.getDb();

  const userId = req.userId ? ObjectID(req.userId) : null;

  const userFollowers = await followers.findOne({
    user: ObjectID(req.params.id)
  });
  const user = await users
    .aggregate([
      { $match: { _id: ObjectID(req.params.id) } },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          image: 1,
          followersCount: 1,
          followingCount: 1,
          age: 1,
          followedByUser: {
            $in: [userId, { $ifNull: [userFollowers.followers, []] }]
          }
        }
      }
    ])
    .toArray();

  res.json(user[0]);
};

exports.edit = async (req, res) => {};
