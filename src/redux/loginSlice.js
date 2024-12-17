import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAdmin: false,
    isLogedIn: false,
    userName: "",
    password: "",
    email: "",
    numLicense: "",
    phone: "",
    tz: "",
    idUser: 0,
  },
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setIsLogedIn: (state, action) => {
      state.isLogedIn = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setTheRest: (state, action) => {
      state.email = action.payload.email;
      state.numLicense = action.payload.numLicense;
      state.phone = action.payload.phone;
      state.tz = action.payload.tz;
      state.idUser = action.payload.idUser;
    },

    logout: (state) => {
      state.isAdmin = false;
      state.isLogedIn = false;
      state.password = "";
      state.userName = "";
      state.email = "";
      state.numLicense = "";
      state.phone = "";
      state.tz = "";
      localStorage.clear();
    },
  },
});

export const {
  setIsAdmin,
  setIsLogedIn,
  setUserName,
  setPassword,
  logout,
  setTheRest,
} = loginSlice.actions;

export default loginSlice.reducer;
