import { SET_FOLLOWING, FOLLOW_USER, UNFOLLOW_USER } from "../types";
import { findUserAndFollow, findUserAndUnfollow } from "../../utils";

export default (state = [], action) => {
  switch (action.type) {
    case SET_FOLLOWING:
      return action.following;
    case FOLLOW_USER:
      return findUserAndFollow(state, action.id);
    case UNFOLLOW_USER:
      return findUserAndUnfollow(state, action.id);
    default:
      return state;
  }
};
