import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
interface AccessState {
  accessToken: string;
}

const initialState = { accessToken: "" } as AccessState;
export const accessSlice = createSlice({
  name: "setAccessToken",
  initialState,
  reducers: {
    changeAccessState(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const { changeAccessState } = accessSlice.actions;
export default accessSlice.reducer;
