import { SET_USER } from "../types";
import axios from "axios";

export const getUser = () => (dispatch, getState) => {
  const { token } = getState().auth;
  if (!token) return dispatch({ type: SET_USER, user: {} });

  axios
    .get("/api/users/self", { headers: { Authorization: `bearer ${token}` } })
    .then(res => {
      dispatch({ type: SET_USER, user: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const editUser = (profile, cover) => (dispatch, getState) => {
  const header = { Authorization: `bearer ${getState().auth.token}` };

  let formData = new FormData();
  profile && formData.append("profile", profile);
  cover && formData.append("cover", cover);

  axios
    .post("/api/users/edit", formData, { headers: header })
    .then(res => console.log(res))
    .catch(console.error);
};
