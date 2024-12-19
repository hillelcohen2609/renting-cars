import { CircularProgress, Stack, Typography } from "@mui/material";
import { Car } from "./shared/car/Car";
import { Filter } from "./shared/filter/Filter";
import { fetchDataHook } from "../../hooks/fetchDataHook";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCarsData, setAllCarsData } from "../../redux/carsSlice";
import { useEffect } from "react";
export const Catalog = () => {
  const data = fetchDataHook("http://localhost:8080/api/cars/getAllCars");
  const rentalData = fetchDataHook(
    "http://localhost:8080/getCarsWithRentings?startDate=2024-12-18&endDate=2024-12-26"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setAllCarsData(data));
      dispatch(setCarsData(data));
    }
  }, [data]);

  //rentalData && dispatch(setRentalCarsData(rentalData));
  const carsData = useSelector((state) => state.cars.cars);

  return (
    <Stack
      minHeight={"93vh"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={data == undefined && "center"}
    >
      <>
        {!!data ? (
          <>
            <Typography variant="h4" marginBottom={"2vh"}>
              Welcome to the catalog{" "}
            </Typography>
            <Filter />
            {!!carsData && (
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
                {carsData.map((car) => {
                  return <Car key={car.idCar} car={car} />;
                })}
              </div>
            )}
          </>
        ) : (
          <CircularProgress size={"20vw"} />
        )}
      </>
    </Stack>
  );
};
