const mongo = require("./mongo");
const { ObjectID } = require("mongodb");

// figures out who user is following and sends their latest posts
// ! sort by createdAt field
exports.getPostsFromFollowing = async (req, res) => {
  const { following, posts } = mongo.getDb();
  const user = await following.findOne({ user: ObjectID(req.userId) });

  const postsFromFollowing = await posts
    .aggregate([
      { $match: { postedBy: { $in: user.following.concat(user._id) } } },
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy"
        }
      },
      {
        $project: {
          text: 1,
          image: 1,
          createdAt: 1,
          likeCount: 1,
          "postedBy.firstName": 1,
          "postedBy.lastName": 1,
          "postedBy._id": 1,
          likedByUser: {
            $in: [ObjectID(req.userId), { $ifNull: ["$likes", []] }]
          }
        }
      }
    ])
    .toArray();

  res.json(postsFromFollowing);
};

exports.addPost = async (req, res) => {
  const { posts, users } = mongo.getDb();
  req.body.createdAt = new Date();

  const insert = posts.insertOne({
    ...req.body,
    postedBy: ObjectID(req.userId)
  });

  const find = users.findOne(
    { _id: ObjectID(req.userId) },
    { fields: { password: 0, following: 0, age: 0 } }
  );

  const [newPost, user] = await Promise.all([insert, find]);
  newPost.ops[0].postedBy = [user];
  res.json(newPost.ops[0]);
};

exports.deletePost = async (req, res) => {
  const { posts } = mongo.getDb();
  const post = await posts.findOne({
    _id: ObjectID(req.params.id)
  });

  if (post.postedBy !== ObjectID(req.userId)) {
    res.status(422).end();
  }
  await posts.deleteOne({
    _id: ObjectID(req.params.id)
  });
  res.status(200).end();
};

// increases like count and pushes userid in likes array, if user has not already liked the post
exports.likePost = async (req, res) => {
  const { posts } = mongo.getDb();
  await posts.updateOne(
    {
      _id: ObjectID(req.params.id),
      likes: { $ne: ObjectID(req.userId) }
    },
    {
      $push: { likes: ObjectID(req.userId) },
      $inc: { likeCount: 1 }
    }
  );
  res.status(200).end();
};

exports.dislikePost = async (req, res) => {
  const { posts } = mongo.getDb();
  await posts.updateOne(
    {
      _id: ObjectID(req.params.id),
      likes: ObjectID(req.userId)
    },
    {
      $pull: { likes: ObjectID(req.userId) },
      $inc: { likeCount: -1 }
    }
  );
  res.status(200).end();
};

exports.getUserPosts = async (req, res) => {
  const { posts } = mongo.getDb();

  const userPosts = await posts
    .aggregate([
      { $match: { postedBy: ObjectID(req.params.userId) } },
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy"
        }
      },
      {
        $project: {
          text: 1,
          image: 1,
          createdAt: 1,
          likeCount: 1,
          "postedBy.firstName": 1,
          "postedBy.lastName": 1,
          "postedBy._id": 1,
          likedByUser: {
            $in: [ObjectID(req.userId), { $ifNull: ["$likes", []] }]
          }
        }
      }
    ])
    .toArray();

  res.json(userPosts);
};
