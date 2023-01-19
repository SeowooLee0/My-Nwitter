import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ExploreData } from "../../pages/Explore";

interface data {
  top: boolean;
  latest: boolean;
  people: boolean;
  focus: string;
}

const initialState = {
  top: true,
  latest: false,
  people: false,
  focus: "top",
} as data;

export const exploreSlice = createSlice({
  name: "setExploreData",
  initialState: initialState,
  reducers: {
    changeExploreState(state, action: PayloadAction<data>) {
      state.top = action.payload.top;
      state.latest = action.payload.latest;
      state.people = action.payload.people;
      state.focus = action.payload.focus;
    },
  },
});

export const { changeExploreState } = exploreSlice.actions;

// export const { changeIsOpened } = getIsOpenedSlice.actions;

export default exploreSlice.reducer;
