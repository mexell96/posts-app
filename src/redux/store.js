import createSagaMiddleware from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import posts, {
  GET_POSTS,
  getPostsSaga,
  GET_COMMENTS,
  getCommentsSaga,
} from "./posts";
import users, {
  GET_PROFILE,
  getProfileSaga,
  GET_USER,
  getUserSaga,
  GET_COMMENTS_PROFILE,
  getCommentsProfileSaga,
} from "./users";

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_PROFILE, getProfileSaga);
  yield takeEvery(GET_USER, getUserSaga);
  yield takeEvery(GET_COMMENTS, getCommentsSaga);
  yield takeEvery(GET_COMMENTS_PROFILE, getCommentsProfileSaga);
}

export const store = configureStore({
  devTools: true,
  reducer: {
    posts,
    users,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export const useStoreDispatch = () => useDispatch();
