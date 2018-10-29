import React from "react";
import ArrowLink from "../../components/ArrowLink";
import { object, string } from "prop-types";

const ArrowNav = ({ match, user, loggedInUser }) => {
  const name = user._id === loggedInUser ? "your" : user.firstName + "'s";
  return (
    <div className="arrow-nav">
      <ArrowLink to={match.url}>{name} POSTS</ArrowLink>
      <ArrowLink to={`${match.url}/following`}>{name} FOLLOWING</ArrowLink>
      <ArrowLink to={`${match.url}/followers`}>{name} FOLLOWERS</ArrowLink>
    </div>
  );
};

ArrowNav.proptypes = {
  user: object,
  match: object,
  loggedInUser: string
};

export default ArrowNav;
