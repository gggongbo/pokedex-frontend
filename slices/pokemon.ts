import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PokemonSliceState = {
  isDetailLoading: boolean;
};

const initialState = {
  isDetailLoading: false,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setDetailLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailLoading = action.payload;

      return state;
    },
  },
});

export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice.reducer;
