import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { addRents } from "../../../../../api/admin/rents";

export const AddRents = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
      carId: "",
      idUser: "",
      customerId: "",
    },
  });

  const onSubmit = (data) => {
    // Convert startTime and endTime to LocalDate format (YYYY-MM-DD)
    const startTimeLocalDate = data.startTime; // this is already in the format 'YYYY-MM-DD'
    const endTimeLocalDate = data.endTime; // this is already in the format 'YYYY-MM-DD'

    const rentData = {
      ...data,
      startTime: startTimeLocalDate,
      endTime: endTimeLocalDate,
    };

    console.log("Rent data submitted:", rentData);
    // Add your logic to send this data to the backend (Java API) which expects LocalDate
    addRents(rentData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} direction={"row"} margin={"3vh 0"}>
        <Controller
          name="startTime"
          control={control}
          rules={{ required: "Start time is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Start Time"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="endTime"
          control={control}
          rules={{ required: "End time is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="End Time"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="carId"
          control={control}
          rules={{ required: "Car ID is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Car ID"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="idUser"
          control={control}
          rules={{ required: "User ID is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="User ID"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="customerId"
          control={control}
          rules={{ required: "Customer ID is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Customer ID"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Button type="submit" variant="contained">
          Add
        </Button>
      </Stack>
    </form>
  );
};
