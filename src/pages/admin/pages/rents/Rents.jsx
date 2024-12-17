import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { AddRents } from "./shared/AddRents";
import { UpdateRents } from "./shared/UpdateRents";
import { fetchDataHook } from "../../../../hooks/fetchDataHook";
import { BASE_API } from "../../../../constant/apiParams";

export const Rents = () => {
  const allRents = fetchDataHook(`${BASE_API}api/renting/getAllRentings`);

  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <AddRents />
      {allRents ? (
        allRents.length > 0 ? (
          allRents.map((rent) => (
            <Stack key={rent.idRenting} marginTop={"5vh"}>
              <UpdateRents rent={rent} />
            </Stack>
          ))
        ) : (
          <Typography variant="h5">
            Sorry there are no renting availble
          </Typography>
        )
      ) : (
        <CircularProgress size={"15vw"} style={{ margin: "auto" }} />
      )}
    </Stack>
  );
};
