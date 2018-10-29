import React from "react";
import Preview from "./previews/Preview";
import { choosePostsInRange } from "../../utils";
import "./Previews.css";

const Previews = ({ posts, currentPost }) => {
  const postsInRange = choosePostsInRange(posts, currentPost);
  return (
    <div className="previews">
      <div>
        <div className="heading">On this page:</div>
        <div className="list">
          {postsInRange.map((post, index) => (
            <Preview
              key={post._id}
              post={post}
              isCurrent={post._id == currentPost._id}
              index={posts.findIndex(item => item._id == post._id) + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Previews;
