import { AUTH_USER, UNAUTH_USER } from "../types";

export default ({ getState, dispatch }) => next => action => {
  if (action.type === AUTH_USER) {
    localStorage.setItem("token", action.token);
  }
  if (action.type === UNAUTH_USER) {
    localStorage.removeItem("token");
  }
  return next(action);
};
