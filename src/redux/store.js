import createSagaMiddleware from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import posts, { GET_POSTS, getPostsSaga } from "./posts";

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(GET_POSTS, getPostsSaga);
}

export const store = configureStore({
  devTools: true,
  reducer: {
    posts,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export const useStoreDispatch = () => useDispatch();
