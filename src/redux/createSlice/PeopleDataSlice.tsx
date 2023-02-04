import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface userData {
  email: string;
  password: string;
  profile: string;
  user_id: number;
  following: boolean;
}
interface peopleState {
  userData: Array<userData>;
}

const initialState = {
  userData: [],
} as peopleState;

export const peopleDataSlice = createSlice({
  name: "setPeopleData",
  initialState: initialState,
  reducers: {
    changePeopleState(state, action: PayloadAction<peopleState>) {
      state.userData = action.payload.userData;
    },
  },
});

export const { changePeopleState } = peopleDataSlice.actions;
// export const { changeIsOpened } = getIsOpenedSlice.actions;

export default peopleDataSlice.reducer;
