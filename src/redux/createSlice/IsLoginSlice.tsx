import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
interface isLoginState {
  isLogin: any;
}

const initialState = { isLogin: " " } as isLoginState;
export const isLoginSlice = createSlice({
  name: "setIsLogin",
  initialState,
  reducers: {
    changeState(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export const { changeState } = isLoginSlice.actions;
export default isLoginSlice.reducer;
