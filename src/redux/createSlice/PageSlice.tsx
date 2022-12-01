import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface page {
  currentPage: number;
}

const initialState = {
  currentPage: 1,
} as page;

export const pageSlice = createSlice({
  name: "setPageData",
  initialState: initialState,
  reducers: {
    changePageState(state, action: PayloadAction<page>) {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { changePageState } = pageSlice.actions;

// export const { changeIsOpened } = getIsOpenedSlice.actions;

export default pageSlice.reducer;
