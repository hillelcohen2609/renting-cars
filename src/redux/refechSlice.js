import { createSlice } from "@reduxjs/toolkit";

const refechSlice = createSlice({
  name: "refetch",
  initialState: {
    cars: 0,
    users: 0,
    rents: 0,
  },
  reducers: {
    setCarsfetch: (state, action) => {
      state.cars = action.payload;
    },
    setRentsFetch: (state, action) => {
      state.rents = action.payload;
    },
    setUsersFetch: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setCarsfetch, setRentsFetch, setUsersFetch } =
  refechSlice.actions;

export default refechSlice.reducer;
