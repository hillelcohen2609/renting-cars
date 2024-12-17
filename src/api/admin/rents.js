import axios from "axios";
import { BASE_API } from "../../constant/apiParams";
import { toast } from "react-toastify";

const baseRoute = BASE_API + "api/renting";

export const addRents = async (body) => {
  try {
    await axios.post(baseRoute + "/addRenting", body);
    toast.success("rent added successfully");
  } catch (error) {
    toast.error("error rent didnt added");
  }
};

export const updateRent = async (idRent, body) => {
  try {
    await axios.put(baseRoute + `/updateRenting/${idRent}`, body);
    toast.success("rent updated successfully");
  } catch (error) {
    toast.error("error rent didnt updated");
  }
};

export const deleteRent = async (idRent) => {
  try {
    await axios.delete(baseRoute + `/deleteRenting/${idRent}`);
    toast.success("rent deleted successfully");
  } catch (error) {
    toast.error("error rent didnt deleted");
  }
};
