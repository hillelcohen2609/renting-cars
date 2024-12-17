import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { AddCar } from "./shared/AddCar";
import { CarUpdate } from "./shared/CarUpdate";
import { fetchDataHook } from "../../../../hooks/fetchDataHook";
import { BASE_API } from "../../../../constant/apiParams";

export const Cars = () => {
  const [refetchCars, setRefetchCars] = useState(1);

  const cars = fetchDataHook(BASE_API + "api/cars/getAllCars", refetchCars);
  if (!cars) {
    return <CircularProgress size={"10vw"} />;
  }
  return (
    <Stack marginTop={"2vh"}>
      <Typography margin={"2vh 0"} variant="h5">
        Add a car
      </Typography>
      <Stack>
        <AddCar setRefetchCars={setRefetchCars} />
      </Stack>
      <Stack marginTop={"2vh"} justifyContent={"center"} alignItems={"center"}>
        <Typography margin={"3vh 0"} textAlign={"center"} variant="h4">
          All Cars
        </Typography>
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarUpdate
              key={car.idCar}
              car={car}
              setRefetchCars={setRefetchCars}
            />
          ))
        ) : (
          <CircularProgress size={"10vw"} />
        )}
      </Stack>
    </Stack>
  );
};
