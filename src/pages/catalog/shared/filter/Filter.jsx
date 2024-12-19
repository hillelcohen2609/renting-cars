import { Button, Slider, Stack, Typography } from "@mui/material";
import React from "react";
import { CustumeDatePicker } from "./date-picker/CustumeDatePicker";
import { setPriceRange } from "../../../../redux/filterSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCarsData } from "../../../../redux/carsSlice";
import { fetchDataHook } from "../../../../hooks/fetchDataHook";
import { format } from "date-fns";

function valuetext(value) {
  return `${value}$`;
}

export const Filter = () => {
  const dispatch = useDispatch();
  const priceRange = useSelector((state) => state.filter.priceRange);
  //const allCars = useSelector((state: RootState) => state.cars.allCars);
  const { baseTimeRange, upperTimeRange } = useSelector(
    (state) => state.filter
  );

  const carWithRange = fetchDataHook(
    `http://localhost:8080/api/cars/getCarsWithRentings?startDate=${format(
      new Date(baseTimeRange),
      "yyyy-MM-dd"
    )}&endDate=${format(new Date(upperTimeRange), "yyyy-MM-dd")}`
  );

  const handleChange = (_event, newValue) => {
    dispatch(setPriceRange(newValue));
  };

  const hundleFilter = () => {
    //@ts-ignore
    const filteredCars =
      carWithRange &&
      //@ts-ignore
      carWithRange.filter((car) => {
        //@ts-ignore
        if (priceRange[0] <= car.price && priceRange[1] >= car.price) {
          return true;
        } else {
          return false;
        }
      });

    dispatch(setCarsData(filteredCars));
  };
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      alignItems={"center"}
      padding={"0.1rem 0.7rem"}
      border={"1px solid black"}
      borderRadius={"8px"}
      justifyContent={"space-between"}
    >
      <CustumeDatePicker />
      <Typography margin={"0 3vw"} variant="subtitle1">
        {" "}
        price range
      </Typography>
      <Slider
        sx={{ margin: "0 2vw", width: "10vw" }}
        min={50}
        max={5000}
        getAriaLabel={() => "Temperature range"}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />

      <Button
        sx={{ textTransform: "none", boxShadow: "none" }}
        variant="contained"
        onClick={hundleFilter}
      >
        filter
      </Button>
    </Stack>
  );
};
