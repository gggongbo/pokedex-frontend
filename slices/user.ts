import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserSliceState = {
  currentPage: number;
};

const initialState = {
  currentPage: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;

      return state;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
