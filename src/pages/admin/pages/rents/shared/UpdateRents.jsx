import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { deleteRent, updateRent } from "../../../../../api/admin/rents";

export const UpdateRents = ({ rent }) => {
  console.log("rent", rent.idRenting);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      idRenting: rent.idRenting,
      startTime: rent?.startTime || "", // Set default value to rent startTime if available
      endTime: rent?.endTime || "", // Set default value to rent endTime if available
      carId: rent?.carId || "",
      idUser: rent?.idUser || "",
      customerId: rent?.customerId || "",
    },
  });

  // Reset form with rent data if rent prop changes
  React.useEffect(() => {
    if (rent) {
      reset({
        idRenting: rent?.idRenting,
        startTime: rent.startTime,
        endTime: rent.endTime,
        carId: rent.carId,
        idUser: rent.idUser,
        customerId: rent.customerId,
      });
    }
  }, [rent, reset]);

  const onSubmit = (data) => {
    // Convert startTime and endTime to LocalDate format (YYYY-MM-DD)
    const startTimeLocalDate = data.startTime; // already in 'YYYY-MM-DD' format
    const endTimeLocalDate = data.endTime; // already in 'YYYY-MM-DD' format

    const rentData = {
      ...data,
      startTime: startTimeLocalDate,
      endTime: endTimeLocalDate,
    };

    updateRent(data.idRenting, rentData);
    setRestore((prev) => prev + 1);
  };

  const handleDelete = () => {
    if (rent) {
      deleteRent(rent.idRenting);
      setRestore((prev) => prev + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        padding={"1rem"}
        border={"1px solid black"}
        borderRadius={"8px"}
        margin={"2vh 2vw"}
      >
        <Controller
          name="idRenting"
          control={control}
          rules={{ required: "id is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="renting ID"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

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
          Update Rent
        </Button>

        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete Rent
        </Button>
      </Stack>
    </form>
  );
};
