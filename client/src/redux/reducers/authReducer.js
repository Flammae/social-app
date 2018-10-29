import { AUTH_USER, UNAUTH_USER, AUTH_ERRORS } from "../types";

const initialState = {
  authenticated: false,
  loginErrors: [],
  registerErrors: [],
  token: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...initialState, token: action.token, authenticated: true };
    case UNAUTH_USER:
      return initialState;
    case AUTH_ERRORS:
      return {
        ...initialState,
        loginErrors: action.loginErrors || [],
        registerErrors: action.registerErrors || []
      };
    default:
      return state;
  }
};
