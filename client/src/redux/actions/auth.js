import { AUTH_USER, UNAUTH_USER, AUTH_ERRORS } from "../types";
import axios from "axios";

// url: "/auth/(register|login)" errorField: "(registerErrors|loginErrors)"
const requestUser = (url, errorField) => fields => dispatch => {
  axios
    .post(url, fields)
    .then(res => {
      // console.log(res.data.token);
      dispatch({ type: AUTH_USER, token: res.data.token });
    })
    .catch(err => {
      if (!err.response) return console.error(err);
      dispatch({ type: AUTH_ERRORS, [errorField]: err.response.data.errors });
    });
};

export const registerUser = requestUser("/auth/register", "registerErrors");
export const loginUser = requestUser("/auth/login", "loginErrors");

export const authUser = token => ({
  type: AUTH_USER,
  token
});

export const authErrors = errors => ({
  type: AUTH_ERRORS,
  ...errors
});

export const unauthUser = () => ({
  type: UNAUTH_USER
});
