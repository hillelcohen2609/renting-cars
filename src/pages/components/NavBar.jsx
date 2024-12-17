import { AppBar, Button, Stack } from "@mui/material";
import { CustomLink } from "../../component/ui/CustomLink";
import { logout } from "../../redux/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import imgLogo from "../../assets/carIcon.webp";

export const NavBar = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const flug = true;
  return (
    <AppBar sx={{ height: "7vh", boxShadow: "none" }}>
      <Stack
        height={"100%"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        margin={"0 2vw"}
      >
        <img src={imgLogo} style={{ height: "3vh" }} />
        {flug && (
          <CustomLink to={"/admin"} text={"admin"} variant={"subtitle1"} />
        )}
        <CustomLink to={"/catalog"} text={"catalog"} variant={"subtitle1"} />
        <CustomLink to={"/"} text={"Home"} variant={"subtitle1"} />
        <Button
          sx={{ color: "white", textTransform: "none" }}
          onClick={() => {
            dispach(logout());
            navigate("/login");
          }}
        >
          logout
        </Button>
      </Stack>
    </AppBar>
  );
};
