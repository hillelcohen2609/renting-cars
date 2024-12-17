import React from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DeleteForever, Update } from "@mui/icons-material";
import { deleteUser, updateUser } from "../../../../../api/admin/users";

export const UserUpdate = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user.username || "",
      password: user.password || "",
      email: user.email || "",
      phone: user.phone || "",
      isAdmin: user.isAdmin ? "true" : "false", // Default to string values for compatibility
      numLicense: user.numLicense || "",
      tz: user.tz || "",
    },
  });

  const onSubmit = (data, action, userId) => {
    if (action === "update") {
      // Convert `isAdmin` from string to boolean
      const formattedData = {
        ...data,
        isAdmin: data.isAdmin === "true",
      };
      console.log("Update:", formattedData);
      updateUser(userId, { ...formattedData, idUser: userId });
    } else if (action === "delete") {
      deleteUser(userId);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, "update", user.idUser))}
    >
      <Stack
        spacing={1}
        width={"14rem"}
        key={user.idUser}
        alignItems="center"
        padding={"1rem"}
        border={"1px solid black"}
        borderRadius={"8px"}
        margin={"2vh 2vw"}
      >
        <TextField
          {...register("username", { required: true })}
          label="Name"
          error={!!errors.name}
          helperText={errors.name && "Name is required"}
        />
        <TextField
          {...register("password", { required: true })}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password && "Password is required"}
        />
        <TextField
          {...register("email", { required: true })}
          label="Email"
          error={!!errors.email}
          helperText={errors.email && "Email is required"}
        />
        <TextField {...register("phone")} label="Phone" />

        <Select
          fullWidth
          sx={{ margin: "0" }}
          labelId="isAdmin-label"
          {...register("isAdmin", { required: true })}
          defaultValue={user.isAdmin ? "true" : "false"}
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>

        <TextField {...register("numLicense")} label="License Number" />
        <TextField {...register("tz")} label="TZ" />

        <Button
          fullWidth
          startIcon={<DeleteForever />}
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            onSubmit({}, "delete", user.idUser);
          }}
        >
          delete
        </Button>
        <Button
          fullWidth
          startIcon={<Update />}
          variant="contained"
          type="submit"
        >
          update
        </Button>
      </Stack>
    </form>
  );
};
