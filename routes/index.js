const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth");
const posts = require("../controllers/posts");
const users = require("../controllers/users");
const { catchErrors } = require("../handlers/errorHandlers");
const uploadController = require("../controllers/upload");

//? posts contoller
{
  // gets posts from people that user follows
  router.get(
    "/api/posts/from-following",
    auth.isAuthenticated(),
    catchErrors(posts.getPostsFromFollowing)
  );
  // get user's posts
  router.get("/api/posts/:userId", catchErrors(posts.getUserPosts));
  // add new post
  router.post(
    "/api/posts",
    auth.isAuthenticated(),
    uploadController.readFile.single("image"),
    uploadController.upload,
    catchErrors(posts.addPost)
  );
  // delete post
  router.delete("/api/posts/:id", catchErrors(posts.deletePost));
  // like a post
  router.post(
    "/api/like-post/:id",
    auth.isAuthenticated(),
    catchErrors(posts.likePost)
  );
  // dislike a post
  router.post(
    "/api/dislike-post/:id",
    auth.isAuthenticated(),
    catchErrors(posts.dislikePost)
  );
}

//? auth controller
{
  router.post(
    "/auth/register",
    auth.validateRegister,
    catchErrors(auth.register)
  );
  router.post("/auth/login", auth.validateLogin, catchErrors(auth.login));
}

//? users conroller
{
  router.post(
    "/api/users/follow/:id",
    auth.isAuthenticated(),
    catchErrors(users.follow)
  );
  router.post(
    "/api/users/unfollow/:id",
    auth.isAuthenticated(),
    catchErrors(users.unfollow)
  );
  // router.post(
  //   "/api/users/edit",
  //   auth.isAuthenticated(),
  //   uploadController.readFile,
  //   uploadController.upload,
  //   catchErrors(users.edit)
  // );
  // get user's following list
  router.get("/api/users/following/:id", catchErrors(users.getFollowing));
  // get user's follower list
  router.get("/api/users/followers/:id", catchErrors(users.getFollowers));
  router.get(
    "/api/users/self",
    auth.isAuthenticated(),
    catchErrors(users.getUserByToken)
  );
  router.get("/api/users/:id", catchErrors(users.getUserById));
}

module.exports = router;
