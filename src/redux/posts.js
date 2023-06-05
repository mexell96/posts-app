import { createAction, createSlice } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";

import { getPostsApi } from "../api/posts";
import { getCommentsApi } from "../api/comments";

export function* getPostsSaga() {
  try {
    yield put(setLoadingPosts(true));
    const payload = yield getPostsApi().then((response) => response.data);

    yield put(getPostsSuccess(payload));
    yield put(setLoadingPosts(false));
  } catch (error) {
    console.log("error", error);
  }
}
export function* getCommentsSaga({ payload: { id } }) {
  try {
    yield put(setLoadingComments({ id, loading: true }));
    const payload = yield getCommentsApi(id).then((response) => response.data);

    yield put(getCommentsSuccess({ id, comments: payload }));
    yield put(setLoadingComments({ id, loading: false }));
  } catch (error) {
    console.log("error", error);
  }
}

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    loadingPosts: false,
  },
  reducers: {
    setLoadingPosts: (state, action) => {
      state.loadingPosts = action.payload;
    },
    setLoadingComments: (state, action) => {
      state.list = state.list.map((post) => {
        return post.id === action.payload.id
          ? { ...post, loading: action.payload.loading }
          : post;
      });
    },
    getPostsSuccess: (state, action) => {
      state.list = action.payload;
    },
    getCommentsSuccess: (state, action) => {
      state.list = state.list.map((post) =>
        post.id === action.payload.id
          ? { ...post, comments: action.payload.comments }
          : post
      );
    },
  },
});

export const GET_POSTS = "posts/getPosts";
export const getPosts = createAction(GET_POSTS);

export const GET_COMMENTS = "posts/getComments";
export const getComments = createAction(GET_COMMENTS);

export const {
  getPostsSuccess,
  getCommentsSuccess,
  setLoadingPosts,
  setLoadingComments,
} = postsSlice.actions;
export default postsSlice.reducer;
