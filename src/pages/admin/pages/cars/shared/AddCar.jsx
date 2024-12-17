import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Stack, TextField, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { addCar } from "../../../../../api/admin/cars";

export const AddCar = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand: "",
      description: "",
      price: "",
      numOfPlace: "",
      color: "",
      type: "",
      model: "",
    },
  });

  const onSubmit = (data) => {
    addCar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} direction={"row"}>
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
          <Add />
        </Button>
      </Stack>
    </form>
  );
};
