import React, { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../../../../api/admin/users";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, DeleteForever, Update } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { UserUpdate } from "./shared/UserUpdate";
import { AddUser } from "./shared/AddUser";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [restore, setRestore] = useState(1);

  console.log("users", users);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
      }
    });
  }, [restore]);

  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Stack margin={"2vh 0"}>
        <Typography variant="h4">Add user:</Typography>
        <AddUser setRestore={setRestore} />
      </Stack>
      <Typography variant="h4">All users</Typography>
      {users.length > 0 ? (
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
          {users.map((user) => (
            <UserUpdate key={user.idUser} user={user} setRestore={setRestore} />
          ))}
        </div>
      ) : (
        <CircularProgress size={"10vw"} />
      )}
    </Stack>
  );
};
