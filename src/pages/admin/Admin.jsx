import { Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CustomLink } from "../../component/ui/CustomLink";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const name = useSelector((state) => state.user.userName);
  const navigate = useNavigate();

  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Typography marginTop={"2vh"} variant="h4">
        Welcome back {name}
      </Typography>
      <Typography marginTop={"2vh"} marginBottom={"2vh"} variant="subtitle1">
        Choose your actions:
      </Typography>
      <Stack
        gap={3}
        width={"80vw"}
        height={"70vh"}
        border={"1px solid black"}
        borderRadius={"8px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button
          sx={{
            width: "70%",
            boxShadow: "none",
            textTransform: "none",
            color: "white",
          }}
          variant="contained"
          onClick={() => navigate("users")}
        >
          users menagement
        </Button>

        <Button
          sx={{
            width: "70%",
            boxShadow: "none",
            textTransform: "none",
            color: "white",
          }}
          variant="contained"
          onClick={() => navigate("cars")}
        >
          cars menagement
        </Button>

        <Button
          sx={{
            width: "70%",
            boxShadow: "none",
            textTransform: "none",
            color: "white",
          }}
          variant="contained"
          onClick={() => navigate("rents")}
        >
          rents menagement
        </Button>
      </Stack>
    </Stack>
  );
};
