import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { AddRents } from "./shared/AddRents";
import { UpdateRents } from "./shared/UpdateRents";
import { fetchDataHook } from "../../../../hooks/fetchDataHook";
import { BASE_API } from "../../../../constant/apiParams";

export const Rents = () => {
  const [restore, setRestore] = useState(1);
  const allRents = fetchDataHook(
    `${BASE_API}api/renting/getAllRentings`,
    restore
  );

  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Typography variant="h5">Add a new rent</Typography>

      <AddRents setRestore={setRestore} />

      {allRents ? (
        allRents.length > 0 ? (
          <>
            <Typography variant="h5">All rents:</Typography>

            <div
              style={{
                display: "flex",
                direction: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                margin: "0.5rem",
              }}
            >
              {allRents.map((rent) => (
                <Stack key={rent.idRenting} marginTop={"5vh"}>
                  <UpdateRents rent={rent} setRestore={setRestore} />
                </Stack>
              ))}
            </div>
          </>
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
