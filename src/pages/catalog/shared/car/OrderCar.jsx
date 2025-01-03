import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Stack, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { BASE_API } from "../../../../constant/apiParams";
import { fetchDataHook } from "../../../../hooks/fetchDataHook";
import { Car } from "./Car";
import { toast } from "react-toastify";

export const OrderCar = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const carDetails = fetchDataHook(`${BASE_API}api/cars/getCar/${id}`);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  const pricePerDay = carDetails && carDetails.price; // Example price per day

  // Watch form values to calculate the total price dynamically
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const calculatePrice = (start, end) => {
    if (!start || !end) return 0;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ); // Difference in days
    return days > 0 ? days * pricePerDay : 0;
  };

  const totalPrice = calculatePrice(startTime, endTime);

  const onSubmit = async (data) => {
    try {
      const orderData = {
        idUser: user.idUser,
        car: carDetails,
        startTime: data.startTime,
        endTime: data.endTime,
        customerId: user.idUser,
      };
      const carAvailble = await axios.get(
        `http://localhost:8080/api/cars/getCarsWithSameRenting?startDate=${data.startTime}&endDate=${data.endTime}`
      );
      console.log("carAvailble", carAvailble);

      const allRentInSameDateandSameId = carAvailble?.data?.filter((car) => {
        console.log("car", car);

        return car.idCar === Number(id);
      }); //=>[car] or []

      console.log("allRentInSameDateandSameId", allRentInSameDateandSameId);

      const isThisCarAvailble = allRentInSameDateandSameId;

      if (isThisCarAvailble && isThisCarAvailble.length !== 0) {
        toast.info("the car cant be rents those dates");
      } else {
        await axios.post(`${BASE_API}api/renting/addRenting`, orderData);
        toast.success("Order submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order.");
    }
  };

  return (
    <>
      <Typography marginTop={"5rem"} textAlign={"center"} variant="h5">
        Order Car
      </Typography>
      <Stack
        marginTop={"2rem"}
        spacing={3}
        width={"100vw"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"row"}
      >
        {carDetails && (
          <Stack>
            <Car car={carDetails} />
          </Stack>
        )}

        <Stack
          padding={"3rem"}
          alignItems={"center"}
          justifyContent={"center"}
          border={"1px solid black"}
          borderRadius={"8px"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Start Time */}
            <div>
              <Controller
                name="startTime"
                control={control}
                rules={{ required: "Start time is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Start Time"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.startTime}
                    helperText={errors.startTime?.message}
                  />
                )}
              />
            </div>

            {/* End Time */}
            <div>
              <Controller
                name="endTime"
                control={control}
                rules={{
                  required: "End time is required",
                  validate: (value) =>
                    value > startTime || "End time must be after start time",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="End Time"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.endTime}
                    helperText={errors.endTime?.message}
                  />
                )}
              />
            </div>

            {/* Total Price */}
            <Typography variant="h6">
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!totalPrice || totalPrice <= 0}
            >
              Submit Order
            </Button>
          </form>
        </Stack>
      </Stack>
    </>
  );
};
