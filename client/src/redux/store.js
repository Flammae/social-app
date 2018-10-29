import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authUser } from "./actions/auth";
import tokenToggle from "./middleware/tokenToggle";
import authReducer from "./reducers/authReducer";
import currentUserReducer from "./reducers/currentUserReducer";
import followersReducer from "./reducers/followersReducer";
import followingReducer from "./reducers/followingReducer";
import postsReducer from "./reducers/postsReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  currentUser: currentUserReducer,
  posts: postsReducer,
  followers: followersReducer,
  following: followingReducer
});

const store = applyMiddleware(tokenToggle, thunk)(createStore)(rootReducer);

// find if there's a token in localstorage and if so, make app state aware of it
const token = localStorage.getItem("token");
token && store.dispatch(authUser(token));

export default store;
