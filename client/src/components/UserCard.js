import React from "react";
import "./UserCard.css";
import MdEdit from "react-icons/lib/md/edit";
import { object, string, func } from "prop-types";
import { Link } from "react-router-dom";

const UserCard = ({ user = {}, loggedInUser, follow, unfollow, matchUrl }) => {
  const actions = {
    follow: {
      buttonText: "follow",
      action: follow && follow.bind(null, user._id)
    },
    unfollow: {
      buttonText: "unfollow",
      action: unfollow && unfollow.bind(null, user._id)
    }
  };

  const actionName = user.followedByUser ? "unfollow" : "follow";
  console.log("actionName", actionName);

  return (
    <div className="user-card">
      <Link to={"/user/" + user._id}>
        <img src="https://placeimg.com/280/280/people" alt="user image" />
      </Link>
      {loggedInUser === user._id ? (
        <Link to={matchUrl + "/edit"} className="edit-button">
          <MdEdit />
        </Link>
      ) : (
        <button className="follow" onClick={actions[actionName].action}>
          {actions[actionName].buttonText}
        </button>
      )}
      <Link className="link-to-user" to={"/user/" + user._id}>
        <div className="info">
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <span className="email">{user.email}</span>
          <div className="info-inner">
            <span>age:</span>
            <span>{user.age}</span>
            <span>followers:</span>
            <span>{user.followersCount}</span>
            <span>following</span>
            <span>{user.followingCount}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

UserCard.propTypes = {
  user: object.isRequired,
  loggedInUser: string,
  follow: func,
  unfollow: func,
  matchUrl: string
};

export default UserCard;
