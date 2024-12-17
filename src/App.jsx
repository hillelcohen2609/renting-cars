import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Layout } from "./pages/components/Layout";
import { theme } from "./theme/theme";
import { Home } from "./pages/home/Home";
import { Account } from "./pages/account/Account";
import { Admin } from "./pages/admin/Admin";
import { Car } from "./pages/car/Car";
import { Catalog } from "./pages/catalog/Catalog";
import { Login } from "./pages/login/Login";
import { NotFound } from "./pages/notFound/NotFound";
import { Cars } from "./pages/admin/pages/cars/Cars";
import { Rents } from "./pages/admin/pages/rents/Rents";
import { Users } from "./pages/admin/pages/users/Users";
import { CarDescription } from "./pages/catalog/shared/car/CarDescription";
import { OrderCar } from "./pages/catalog/shared/car/OrderCar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account/:id" element={<Account />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/car/:id" element={<CarDescription />} />
            <Route path="/catalog/car/:id/order" element={<OrderCar />} />
            {/* <Route path="/book" element={<Home />} /> */}
            <Route path="/car/:id" element={<Car />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/cars" element={<Cars />} />
            <Route path="/admin/rents" element={<Rents />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
