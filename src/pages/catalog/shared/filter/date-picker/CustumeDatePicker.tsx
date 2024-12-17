import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Stack, Typography } from "@mui/material";
import {
  setBaseTimeRange,
  setUpperTimeRange,
} from "../../../../../redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

export const CustumeDatePicker = () => {
  const timeRange = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const hundleChangeDate = (value: Dayjs | null, key: number) => {
    if (value) {
      //const milliseconds = value.get("millisecond");
      const localTime = value.valueOf();
      const date = new Date(value.toDate()).getUTCMilliseconds();
      console.log("Selected Date (Local):", localTime);
      console.log("Milliseconds:", date);
      if (key === 1) {
        //Base range
        //TODO set base range
        dispatch(setBaseTimeRange(localTime));
      } else {
        //upper range
        //TODO setUpper rangeTime
        dispatch(setUpperTimeRange(localTime));
      }
    }
  };

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="subtitle1">from</Typography>
        <DateTimePicker
          key={1}
          format="DD/MM/YYYY HH:mm"
          value={dayjs(timeRange.baseTimeRange)}
          minDate={dayjs(timeRange.baseTimeRange)}
          maxDate={dayjs(timeRange.upperTimeRange)}
          onChange={(e) => hundleChangeDate(e, 1)}
        />
        <Typography variant="subtitle1">to</Typography>
        <DateTimePicker
          key={2}
          format="DD/MM/YYYY HH:mm"
          value={dayjs(timeRange.upperTimeRange)}
          minDate={dayjs(timeRange.baseTimeRange).add(1, "day")}
          maxDate={dayjs(timeRange.baseTimeRange).add(1, "month")}
          onChange={(e) => hundleChangeDate(e, 2)}
        />
      </LocalizationProvider>
    </Stack>
  );
};
