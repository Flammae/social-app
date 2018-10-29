import { SET_USER, FOLLOW_USER, UNFOLLOW_USER } from "../types";
import { findUserAndFollow, findUserAndUnfollow } from "../../utils";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case FOLLOW_USER:
      return findUserAndFollow(state, action.id)[0];
    case UNFOLLOW_USER:
      return findUserAndUnfollow(state, action.id)[0];
    default:
      return state;
  }
};
