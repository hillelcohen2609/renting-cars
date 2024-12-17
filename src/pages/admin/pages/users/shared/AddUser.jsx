import React from "react";
import { useForm } from "react-hook-form";
import { Stack, TextField, Button, Select, MenuItem } from "@mui/material";
import { addUser } from "../../../../../api/admin/users";

export const AddUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // handle form data submission here
    const formattedData = {
      ...data,
      isAdmin: data.isAdmin === "true",
    };
    addUser(formattedData);

    // Clear all fields after submission
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack marginTop={"2vh"} direction={"row"}>
        <TextField
          label="name"
          fullWidth
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="password"
          type="password"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="email"
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="phone"
          fullWidth
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          label="numLicense"
          fullWidth
          {...register("numLicense")}
          error={!!errors.numLicense}
          helperText={errors.numLicense?.message}
        />
        <TextField
          label="tz"
          fullWidth
          {...register("tz")}
          error={!!errors.tz}
          helperText={errors.tz?.message}
        />
        <Select
          labelId="isAdmin-label"
          {...register("isAdmin", { required: true })}
          defaultValue={"false"}
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
        <Button variant="outlined" type="submit">
          Add
        </Button>
      </Stack>
    </form>
  );
};
