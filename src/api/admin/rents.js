import axios from "axios";
import { BASE_API } from "../../constant/apiParams";

const baseRoute = BASE_API + "api/renting";

export const addRents = async (body) => {
  try {
    await axios.post(baseRoute + "/addRenting", body);
    alert("rent added successfully");
  } catch (error) {
    alert("error rent didnt added");
  }
};

export const updateRent = async (idRent, body) => {
  try {
    await axios.put(baseRoute + `/updateRenting/${idRent}`, body);
    alert("rent updated successfully");
  } catch (error) {
    alert("error rent didnt updated");
  }
};

export const deleteRent = async (idRent) => {
  try {
    await axios.delete(baseRoute + `/deleteRenting/${idRent}`);
    alert("rent deleted successfully");
  } catch (error) {
    alert("error rent didnt deleted");
  }
};
