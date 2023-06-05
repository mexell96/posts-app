import { createAction, createSlice } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";

import { getUserApi, getUserPostsApi } from "../api/users";

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
  },
});

export const GET_USER = "users/getUser";
export const getUser = createAction(GET_USER);

export const { getUserSuccess, setLoading } = usersSlice.actions;
export default usersSlice.reducer;
