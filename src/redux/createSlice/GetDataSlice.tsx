import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Data, isLike, Like, Tweet } from "../../routers/Home";

interface getDataState {
  dataLength: number;
  currentPosts: Array<Data>;
  id: string;
  currentPage: number;
  postPerPage: number;
}

const initialState = {
  dataLength: 0,
  currentPosts: [],
  id: "",
  currentPage: 1,
  postPerPage: 10,
} as getDataState;

const initialState2 = {
  id: "",
  email: "",
  tweet_id: 0,
  content: "",
  tag: [],
  write_date: "",
  comment: [],
  like: [],
  is_opened: false,
  user_id: 0,
  is_like: [],
} as Data;

export const getDataSlice = createSlice({
  name: "setTweetData",
  initialState: initialState,
  reducers: {
    changGetDataState(state, action: PayloadAction<getDataState>) {
      state.dataLength = action.payload.dataLength;
      state.currentPosts = action.payload.currentPosts;
      state.id = action.payload.id;
    },
    changeCurrentPosts(state, action: PayloadAction<[]>) {
      state.currentPosts = action.payload;
    },
    changeCurentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    changeIsOpened(state, action: PayloadAction<boolean>) {
      state.currentPosts.map((t) => {
        return (t.is_opened = action.payload);
      });
    },
  },
});

export const {
  changGetDataState,
  changeCurentPage,
  changeCurrentPosts,
  changeIsOpened,
} = getDataSlice.actions;

// export const { changeIsOpened } = getIsOpenedSlice.actions;

export default getDataSlice.reducer;
