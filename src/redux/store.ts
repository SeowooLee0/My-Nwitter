import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import ExploreSlice, { changeExploreState } from "./createSlice/ExploreSlice";
import GetAccessToken from "./createSlice/GetAccessToken";
import GetDataSlice, { changGetDataState } from "./createSlice/GetDataSlice";
import PeopleDataSlice from "./createSlice/PeopleDataSlice";
import IsLoginSlice from "./createSlice/IsLoginSlice";
import handleIsLogin, { isLoginSlice } from "./createSlice/IsLoginSlice";
import SearchSlice from "./createSlice/SearchSlice";

export const store = configureStore({
  reducer: {
    changeIsLogin: IsLoginSlice,
    getData: GetDataSlice,
    getAccessToken: GetAccessToken,
    changeExploreState: ExploreSlice,
    changeSearchState: SearchSlice,
    changePeopleState: PeopleDataSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
