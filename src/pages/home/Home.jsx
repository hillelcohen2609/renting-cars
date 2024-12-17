import { Button, Stack, Typography } from "@mui/material";
import car from "../../assets/carIcon.webp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const user = useSelector((state) => state.user.isLogedIn); //boolean
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <Stack
      margin={"auto"}
      width={"60vw"}
      height={"93vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography
        variant="h4"
        textAlign={"center"}
        marginTop={"5vh"}
        marginBottom={"5vh"}
      >
        Welcome to MalyDrive – Your Trusted Car Rental Partner!
      </Typography>
      <img src={car} alt="car logo" style={{ width: "10vw" }} />

      <Typography variant="subtitle1" textAlign={"center"}>
        Discover reliable, affordable, and stylish vehicles for every journey.
        From compact cars to luxury SUVs, we’ve got the perfect ride for your
        needs. Flexible plans, great prices, and exceptional service await.
      </Typography>
    </Stack>
  );
};
