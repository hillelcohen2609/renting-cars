import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    allCars: [],
    rentals: [],
  },
  reducers: {
    setCarsData: (state, action) => {
      state.cars = action.payload;
    },
    setRentalCarsData: (state, action) => {
      state.rentals = action.payload;
    },
    setAllCarsData: (state, action) => {
      state.allCars = action.payload;
    },
  },
});

export const { setCarsData, setRentalCarsData, setAllCarsData } =
  carSlice.actions;

export default carSlice.reducer;
