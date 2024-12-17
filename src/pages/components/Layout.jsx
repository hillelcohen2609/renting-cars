import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default styles

export const Layout = () => {
  const user = useSelector((state) => state.user.isLogedIn); //boolean

  return (
    <div>
      {user && <NavBar />}
      <div style={{ marginTop: "7vh" }}>
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  );
};
