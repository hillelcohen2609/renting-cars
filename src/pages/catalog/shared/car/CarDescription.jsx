import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataHook } from "../../../../hooks/fetchDataHook";
import { BASE_API } from "../../../../constant/apiParams";
import { Button, Stack, TextareaAutosize, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const defaultImage =
  "data:image/jpeg;base64,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";

export const CarDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [refech, setRefech] = useState(1);
  const carDetails = fetchDataHook(`${BASE_API}api/cars/getCar/${id}`, refech);

  const [selectedFile, setSelectedFile] = useState(null);

  const isAdmin = useSelector((state) => state.user.isAdmin);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Update state with the selected file
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData(); // Create a FormData object
    formData.append("file", selectedFile); // Append the file with the key 'file'

    try {
      // Make POST request to the backend
      const response = await axios.post(
        `http://localhost:8080/api/cars/${id}/uploadImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );
      alert("image uploaded succesfully");
      setRefech((prev) => prev + 1);
      // Display the success response
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {!!carDetails && (
        <Stack
          width={"70%"}
          padding={"3rem"}
          margin={"auto"}
          //marginTop={"3vh"}
          border={"1px solid black"}
          borderRadius={"8px"}
        >
          <Typography variant="h4">Car Description:</Typography>
          {isAdmin && (
            <>
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <button onClick={handleUpload}>Upload Image</button>
            </>
          )}

          <img
            src={
              carDetails && carDetails.image
                ? `data:image/jpeg;base64,${carDetails?.image}`
                : defaultImage
            }
            alt=""
            style={{ width: "30%", margin: "auto" }}
          />
          <Div text={carDetails.brand} description={"the brand car:"} />
          <Div text={carDetails.color} description={"the car color:"} />
          <Div text={carDetails.description} description={"description:"} />
          <Div text={carDetails.model} description={"the car model:"} />
          <Div text={carDetails.numOfPlace} description={"Number of place:"} />
          <Div
            text={carDetails.price + "$"}
            description={"the price per day:"}
          />
          <Div text={carDetails.type} description={"the type car:"} />
          <Button
            sx={{ background: "red" }}
            variant="contained"
            onClick={() => navigate("order")}
          >
            Order
          </Button>
        </Stack>
      )}
    </>
  );
};

const Div = ({ text, description }) => {
  return (
    <div style={{ margin: "2vh 0" }}>
      <div
        style={{
          padding: "10px",
          border: "1px solid black",
          borderRadius: "8px",
          textAlign: "center",
          background: "#00ffb6b8",
        }}
      >
        <span>{description}</span>
        <span style={{ color: "grey" }}>{text}</span>
      </div>
    </div>
  );
};
