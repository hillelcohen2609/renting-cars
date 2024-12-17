import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Stack, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { BASE_API } from "../../../../constant/apiParams";
import { fetchDataHook } from "../../../../hooks/fetchDataHook";

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
        carId: id,
        startTime: data.startTime,
        endTime: data.endTime,
        customerId: user.idUser,
      };
      const carAvailble = await axios.get(
        `http://localhost:8080/api/cars/getCarsWithSameRenting?startDate=${data.startTime}&endDate=${data.endTime}`
      );
      console.log("carAvailble", carAvailble.data);
      const isThisCarAvailble =
        carAvailble.data.length > 0 ||
        carAvailble.data.filter((car) => car.idCar === id);
      if (isThisCarAvailble) {
        alert("the car cant be rents those dates");
      } else {
        console.log("Submitting data:", orderData);
        await axios.post(`${BASE_API}api/renting/addRenting`, orderData);
        alert("Order submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order.");
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5">Order Car</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Start Time */}
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

        {/* End Time */}
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
  );
};
