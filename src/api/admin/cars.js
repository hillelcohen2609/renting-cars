import axios from "axios";
import { toast } from "react-toastify";

import { BASE_API } from "../../constant/apiParams";

const baseRoute = BASE_API + "api/cars";

export const addCar = async (body) => {
  try {
    await axios.post(baseRoute + "/addCar", body);
    toast.success("car added successfully");
  } catch (error) {
    toast.error("somthing went wrong");
  }
};

export const updateCar = async (body, idCar) => {
  try {
    await axios.put(baseRoute + `/updateCar/${idCar}`, body);
    toast.success("car apdated successfully!");
  } catch (error) {
    toast.error("somthing went wrong");
  }
};

export const deleteCar = async (idCar) => {
  try {
    await axios.delete(baseRoute + `/deleteCar/${idCar}`);

    toast.success("car deleted successfully");
  } catch (error) {
    toast.error("somthing went wrong");
  }
};
