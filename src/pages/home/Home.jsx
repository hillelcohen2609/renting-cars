import { Button, Stack, Typography } from "@mui/material";
import car from "../../assets/carIcon.webp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const user = useSelector((state) => state.user.isLogedIn); //boolean
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  console.log("user", user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cars/2/image`,
        { responseType: "arraybuffer" } // Important to get raw binary data
      );

      // Convert the byte array to Base64 string
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      // Set the image source
      setImgSrc(`data:image/jpeg;base64,${base64}`);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Update state with the selected file
  };

  // Function to send the file to the backend
  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData(); // Create a FormData object
    formData.append("file", selectedFile); // Append the file with the key 'file'

    try {
      // Make POST request to the backend
      const response = await axios.post(
        `http://localhost:8080/api/cars/2/uploadImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );
      fetchImage();
      // Display the success response
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

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
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload Image</button>
      {imgSrc !== "" && <img src={imgSrc} alt="" />}
    </Stack>
  );
};
