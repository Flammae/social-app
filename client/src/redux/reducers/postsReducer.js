import {
  SET_POSTS,
  DELETE_POSTS,
  ADD_POST,
  ADD_POST_PENDING,
  ADD_POST_ERROR,
  LIKE_POST,
  UNLIKE_POST
} from "../types";

const initialState = {
  postState: "POSTED",
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...initialState, posts: action.posts };
    case ADD_POST:
      return {
        postState: "POSTED",
        posts: [action.post].concat(state.posts)
      };
    case ADD_POST_PENDING:
      return {
        postState: "PENDING",
        posts: state.posts
      };
    case ADD_POST_ERROR:
      return Object.assign({}, state, { postState: "ERROR" });
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.id) {
            post.likeCount = post.likeCount || 0;
            post.likeCount++;
            post.likedByUser = true;
          }
          return post;
        })
      };
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.id) {
            post.likeCount--;
            post.likedByUser = false;
          }
          return post;
        })
      };
    case DELETE_POSTS:
      return [];
    default:
      return state;
  }
};
