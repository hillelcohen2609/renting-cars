import { Stack, Typography } from "@mui/material";
import { CustomLink } from "../../component/ui/CustomLink";
import { ArrowBack } from "@mui/icons-material";
import page404 from "../../assets/page404.svg";

export const NotFound = () => {
  return (
    <Stack height={"93vh"} justifyContent={"center"} alignItems={"center"}>
      <img src={page404} alt="404 icon" style={{ height: "40vh" }} />
      <Typography variant="h4">Oops page not found</Typography>
      <div style={{ position: "relative", marginTop: "2vh", color: "grey" }}>
        <CustomLink
          color={"grey"}
          text={"back to home page"}
          to={"/"}
          variant={"subtitle1"}
        />
        <ArrowBack sx={{ position: "absolute", left: "-2rem", top: "0" }} />
      </div>
    </Stack>
  );
};
