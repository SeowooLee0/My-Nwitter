import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
interface isLoginState {
  isLogin: boolean;
}

const initialState = { isLogin: false } as isLoginState;
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
