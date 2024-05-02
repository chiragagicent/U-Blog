import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectToken } from "../auth/authSlice";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    fetchPostsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    },
    fetchPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPostStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addPostSuccess: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
      state.error = null;
    },
    addPostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatePostStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updatePostSuccess: (state, action) => {
      state.isLoading = false;
      const updatedPost = action.payload;
      const index = state.posts.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
      state.error = null;
    },
    updatePostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deletePostStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.error = null;
    },
    deletePostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostStart,
  addPostSuccess,
  addPostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} = postSlice.actions;

// Async action to fetch posts
export const fetchPosts = () => async (dispatch, getState) => {
  dispatch(fetchPostsStart());
  const token=localStorage.getItem("token");
  console.log(token);
  if(token=== null){
    const token = selectToken(getState());
    console.log(token);
  }
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchPostsSuccess(response.data));
  } catch (error) {
    dispatch(fetchPostsFailure(error.response.data.message));
  }
};

// Async action to add a post
export const addPost = (title, content) => async (dispatch, getState) => {
  dispatch(addPostStart());
  const token = selectToken(getState());
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/posts",
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(addPostSuccess(response.data.post));
  } catch (error) {
    dispatch(addPostFailure(error.response.data.message));
  }
};

// Async action to update a post
export const updatePost = (postId, postData) => async (dispatch, getState) => {
  dispatch(updatePostStart());
  const token = selectToken(getState());
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/posts/${postId}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updatePostSuccess(response.data.post));
  } catch (error) {
    dispatch(updatePostFailure(error.response.data.message));
  }
};

// Async action to delete a post
export const deletePost = (postId) => async (dispatch, getState) => {
  dispatch(deletePostStart());
  const token = selectToken(getState());
  try {
    await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deletePostSuccess(postId));
  } catch (error) {
    dispatch(deletePostFailure(error.response.data.message));
  }
};

export const selectPosts = (state) => state.posts.posts;

export default postSlice.reducer;
