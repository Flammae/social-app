import React from "react";
import moment from "moment";
import classNames from "classnames";
import "./Post.css";

const Post = ({ post, likePost, unlikePost }) => {
  const fromNow = moment(post.createdAt).fromNow();
  const fnName = post.likedByUser ? "unlike" : "like";
  const fns = {
    like: likePost.bind(null, post._id),
    unlike: unlikePost.bind(null, post._id)
  };

  const likeClass = classNames("post-button", { liked: post.likedByUser });

  return (
    <div className="post" id={post._id}>
      <div className="post-header">
        <img src="https://placeimg.com/64/64/people" alt="" />
        <h3>{`${post.postedBy[0].firstName} ${post.postedBy[0].lastName}`}</h3>
        <span>{fromNow}</span>
      </div>
      {post.text && <div className="content">{post.text}</div>}
      {post.image && <img src={post.image} className="image" alt={post.text} />}
      {/* <div className="divider" /> */}
      <div className="buttons">
        <button className={likeClass} onClick={fns[fnName]}>
          Like <span>{post.likeCount > 0 && post.likeCount}</span>
        </button>
        <button className="post-button">
          Comment <span>{post.commentCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
