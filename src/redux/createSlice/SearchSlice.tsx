import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface searchData {
  search: string;
}

const initialState = {
  search: "",
} as searchData;

export const searchSlice = createSlice({
  name: "setSearchData",
  initialState: initialState,
  reducers: {
    changSearchState(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { changSearchState } = searchSlice.actions;

export default searchSlice.reducer;
