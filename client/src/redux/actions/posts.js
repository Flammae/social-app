import axios from "axios";
import {
  SET_POSTS,
  ADD_POST,
  ADD_POST_ERROR,
  ADD_POST_PENDING,
  LIKE_POST,
  UNLIKE_POST
} from "../types";

export const getPosts = url => (dispatch, getState) => {
  const tokenHeader = { Authorization: "bearer " + getState().auth.token };
  axios
    .get(url, { headers: tokenHeader })
    .then(res => {
      dispatch({ type: SET_POSTS, posts: res.data });
    })
    .catch(err => console.log(err));
};

export const addPost = (image, text) => (dispatch, getState) => {
  dispatch({ type: ADD_POST_PENDING });

  let formData = new FormData();
  image && formData.append("image", image);
  text && formData.append("text", text);

  const token = getState().auth.token;
  axios
    .post("/api/posts", formData, {
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => dispatch({ type: ADD_POST, post: res.data }))
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_POST_ERROR });
    });
};

export const likePost = id => (dispatch, getState) => {
  dispatch({ type: LIKE_POST, id });

  const token = getState().auth.token;
  axios
    .post("/api/like-post/" + id, null, {
      headers: {
        Authorization: "bearer " + token
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: UNLIKE_POST, id });
    });
};

export const unlikePost = id => (dispatch, getState) => {
  dispatch({ type: UNLIKE_POST, id });

  const token = getState().auth.token;
  axios
    .post("/api/dislike-post/" + id, null, {
      headers: {
        Authorization: "bearer " + token
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LIKE_POST, id });
    });
};
