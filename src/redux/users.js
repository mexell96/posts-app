import { createAction, createSlice } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";

import { getUserApi, getUserPostsApi } from "../api/users";
import { getCommentsApi } from "../api/comments";

export function* getUserSaga({ payload: { id } }) {
  try {
    yield put(setLoading(true));

    const user = yield getUserApi(id).then((response) => response.data);
    const userPosts = yield getUserPostsApi(id).then(
      (response) => response.data
    );

    yield put(getUserSuccess({ ...user, posts: userPosts }));
    yield put(setLoading(false));
  } catch (error) {
    console.log("error", error);
  }
}

export function* getCommentsProfileSaga({ payload: { postId, profileId } }) {
  try {
    yield put(setLoadingComments({ profileId, postId, loading: true }));
    const payload = yield getCommentsApi(postId).then(
      (response) => response.data
    );

    yield put(
      getCommentsProfileSuccess({ profileId, postId, comments: payload })
    );
    yield put(setLoadingComments({ profileId, postId, loading: false }));
  } catch (error) {
    console.log("error", error);
  }
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.list.push(action.payload);
    },
    setLoadingComments: (state, action) => {
      state.list = state.list.map((user) => {
        if (user.id === action.payload.profileId) {
          const posts = user.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, loading: action.payload.loading }
              : post
          );

          return { ...user, posts };
        } else {
          return user;
        }
      });
    },
    getCommentsProfileSuccess: (state, action) => {
      state.list = state.list.map((user) => {
        if (user.id === action.payload.profileId) {
          const posts = user.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, comments: action.payload.comments }
              : post
          );

          return { ...user, posts };
        } else {
          return user;
        }
      });
    },
  },
});

export const GET_USER = "users/getUser";
export const getUser = createAction(GET_USER);

export const GET_COMMENTS_PROFILE = "users/getCommentsProfile";
export const getCommentsProfile = createAction(GET_COMMENTS_PROFILE);

export const {
  getUserSuccess,
  setLoading,
  setLoadingComments,
  getCommentsProfileSuccess,
} = usersSlice.actions;
export default usersSlice.reducer;
