import { createAction, createSlice } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";

import { getPostsApi } from "../api/posts";

export function* getPostsSaga() {
  try {
    const payload = yield getPostsApi().then((response) => response.data);

    yield put(getPostsSuccess(payload));
  } catch (error) {
    console.log("error", error);
  }
}

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
  },
  reducers: {
    getPostsSuccess: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const GET_POSTS = "posts/getPosts";
export const getPosts = createAction(GET_POSTS);

export const { getPostsSuccess } = postsSlice.actions;
export default postsSlice.reducer;
