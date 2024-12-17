import axios from "axios";
import { BASE_API } from "../../constant/apiParams";

export const getAllUsers = async () => {
  const response = {
    data: [],
    status: 200,
  };
  try {
    const res = await axios.get(BASE_API + "api/users/getAllUsers");
    response.data = res.data;
  } catch (error) {
    response.status = 401;
  }
  return response;
};

export const updateUser = async (id, user) => {
  try {
    console.log("user", user);

    const res = await axios.put(BASE_API + `api/users/updateUser/${id}`, user);
    if (res) {
      alert("user updated sucessfully");
    }
  } catch (error) {
    alert("somthing went wrong");
  }
};

export const addUser = async (body) => {
  try {
    axios.post(BASE_API + "api/users/addUser", body);
    alert("user added sucessfully");
  } catch (error) {
    alert("user didnt updated");
  }
};

export const deleteUser = async (id) => {
  try {
    axios.delete(BASE_API + `api/users/deleteUser/${id}`);
    alert("user deleted sucessfully");
  } catch (error) {
    alert("user didnt deleted");
  }
};
