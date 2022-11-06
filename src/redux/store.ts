import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import GetAccessToken from "./createSlice/GetAccessToken";
import GetDataSlice, { changGetDataState } from "./createSlice/GetDataSlice";
import IsLoginSlice from "./createSlice/IsLoginSlice";
import handleIsLogin, { isLoginSlice } from "./createSlice/IsLoginSlice";

export const store = configureStore({
  reducer: {
    changeIsLogin: IsLoginSlice,
    getData: GetDataSlice,
    getAccessToken: GetAccessToken,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
