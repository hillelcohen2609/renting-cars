import axios from "axios";

import { BASE_API } from "../../constant/apiParams";

const baseRoute = BASE_API + "api/cars";

export const addCar = async (body) => {
  try {
    await axios.post(baseRoute + "/addCar", body);
    alert("car added successfully");
  } catch (error) {
    alert("somthing went wrong");
  }
};

export const updateCar = async (body, idCar) => {
  try {
    await axios.put(baseRoute + `/updateCar/${idCar}`, body);
    alert("car apdated successfully");
  } catch (error) {
    alert("somthing went wrong");
  }
};

export const deleteCar = async (idCar) => {
  try {
    await axios.delete(baseRoute + `/deleteCar/${idCar}`);
    alert("car deleted successfully");
  } catch (error) {
    alert("somthing went wrong");
  }
};
