import axios from "axios";

export const getLogin = async (url, body) => {
  try {
    return await axios.post(url, body);
  } catch (error) {
    return { status: 500 };
  }
};

export const register = async (url, body) => {
  try {
    return await axios.post(url, body);
  } catch (error) {
    return { status: 500 };
  }
};
