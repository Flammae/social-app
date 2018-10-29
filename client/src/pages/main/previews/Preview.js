import React from "react";
import classNames from "classnames";
import "./Preview.css";

const Preview = ({ post, index, isCurrent }) => {
  const className = classNames("preview", { selected: isCurrent });
  return (
    <a href={"#" + post._id} className={className}>
      <span className="index">{isCurrent ? <div /> : index}</span>
      <img src="https://placeimg.com/48/48/people" alt="" />
      <div className="right">
        <span className="title">
          {post.postedBy[0].firstName} {post.postedBy[0].lastName}
        </span>
        <span className="preview-post">
          {post.text && post.text.slice(0, 20)}
        </span>
      </div>
    </a>
  );
};

export default Preview;
