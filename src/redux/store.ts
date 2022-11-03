import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import handleIsLogin from "./createSlice/handleIsLogin";

export const store = configureStore({
  reducer: {
    change: handleIsLogin,
  },
});
export type RootState = ReturnType<typeof store.getState>;

// export const stateisLogin = (state: any) => state.cn.isLogin;

export default store;
