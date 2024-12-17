import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Stack, TextField, Button } from "@mui/material";
import { updateCar, deleteCar } from "../../../../../api/admin/cars";

export const CarUpdate = ({ car, setRefetchCars }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: car, // Initialize the form with the car's current details
  });

  const onSubmit = (data, action, idCar) => {
    if (action === "update") {
      //apdate car
      updateCar(data, idCar);
      setRefetchCars((prev) => prev + 1);
    } else {
      //delete car
      deleteCar(idCar);
      setRefetchCars((prev) => prev + 1);
    }

    //onUpdate(data); // Call the parent-provided update function with the updated car details
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, "update", car.idCar))}
    >
      <Stack spacing={2} direction={"row"} marginTop={"2vh"}>
        <Controller
          name="brand"
          control={control}
          rules={{ required: "Brand is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Brand"
              error={!!errors.brand}
              helperText={errors.brand?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />
        <Controller
          name="numOfPlace"
          control={control}
          rules={{ required: "Number of places is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Number of Places"
              type="number"
              error={!!errors.numOfPlace}
              helperText={errors.numOfPlace?.message}
            />
          )}
        />
        <Controller
          name="color"
          control={control}
          rules={{ required: "Color is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Color"
              error={!!errors.color}
              helperText={errors.color?.message}
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          rules={{ required: "Type is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Type"
              error={!!errors.type}
              helperText={errors.type?.message}
            />
          )}
        />
        <Controller
          name="model"
          control={control}
          rules={{ required: "Model is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Model"
              error={!!errors.model}
              helperText={errors.model?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onSubmit({}, "delete", car.idCar);
          }}
          variant="contained"
          color="primary"
        >
          delete
        </Button>
      </Stack>
    </form>
  );
};
