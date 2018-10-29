import { GET_CURRENT_USER, SET_CURRENT_USER } from "../types";
import axios from "axios";

export const getCurrentUser = id => (dispatch, getState) => {
  // if we are on the user's own page, just set currentUser to logged in user;
  const loggedInUser = getState().user;
  if (id === loggedInUser._id) {
    console.log(true);
    return dispatch({
      type: SET_CURRENT_USER,
      user: loggedInUser
    });
  }

  const tokenHeader = { Authorization: "bearer " + getState().auth.token };

  axios
    .get("/api/users/" + id, { headers: tokenHeader })
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        user: res.data
      });
    })
    .catch(err => console.log(err));
};
