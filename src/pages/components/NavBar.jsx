import { AppBar, Button, Stack } from "@mui/material";
import { CustomLink } from "../../component/ui/CustomLink";
import { logout } from "../../redux/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        <CustomLink
          to={"/account/:id"}
          text={"account"}
          variant={"subtitle1"}
        />
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
