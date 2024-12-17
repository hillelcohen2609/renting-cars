import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useSelector } from "react-redux";

export const Layout = () => {
  const user = useSelector((state) => state.user.isLogedIn); //boolean

  return (
    <div>
      {user && <NavBar />}
      <div style={{ marginTop: "7vh" }}>
        <Outlet />
      </div>
    </div>
  );
};
