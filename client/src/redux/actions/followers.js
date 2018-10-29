import axios from "axios";
import {
  SET_FOLLOWERS,
  SET_FOLLOWING,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "../types";

export const getFollowers = id => (dispatch, getState) => {
  const tokenHeader = { Authorization: "bearer " + getState().auth.token };

  axios
    .get("/api/users/followers/" + id, { headers: tokenHeader })
    .then(res => res.data.map(item => item.followers))
    .then(followers => dispatch({ type: SET_FOLLOWERS, followers }))
    .catch(console.error);
};

export const getFollowing = id => (dispatch, getState) => {
  const tokenHeader = { Authorization: "bearer " + getState().auth.token };

  axios
    .get("/api/users/following/" + id, { headers: tokenHeader })
    .then(res => res.data.map(item => item.following))
    .then(following => dispatch({ type: SET_FOLLOWING, following }))
    .catch(console.error);
};

// follow, unfollow
const toggleFollowers = (url, dispatchType) => id => (dispatch, getState) => {
  console.log("reached");

  if (!getState().auth.token) return;
  const tokenHeader = { Authorization: "bearer " + getState().auth.token };

  axios
    .post(url + id, null, { headers: tokenHeader })
    .then(() => dispatch({ type: dispatchType, id }))
    .catch(console.error);
};

export const follow = toggleFollowers("/api/users/follow/", FOLLOW_USER);
export const unfollow = toggleFollowers("/api/users/unfollow/", UNFOLLOW_USER);
