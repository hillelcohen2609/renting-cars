import { createSlice } from "@reduxjs/toolkit";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs, { Dayjs } from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

const today = dayjs().valueOf();
const endTimeRange = dayjs().add(14, "days").valueOf();

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    baseTimeRange: today,
    upperTimeRange: endTimeRange,
    priceRange: [50, 5000],
  },
  reducers: {
    setBaseTimeRange: (state, action) => {
      state.baseTimeRange = action.payload;
    },
    setUpperTimeRange: (state, action) => {
      state.upperTimeRange = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});

export const { setBaseTimeRange, setUpperTimeRange, setPriceRange } =
  filterSlice.actions;

export default filterSlice.reducer;
