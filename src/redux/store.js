import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import filterSlice from "./filterSlice";
import carSlise from "./carsSlice";
import refechSlice from "./refechSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedUserState = localStorage.getItem("authState");
    return serializedUserState
      ? { user: JSON.parse(serializedUserState) }
      : undefined; // Only load the user state
  } catch (e) {
    console.error("Failed to load state", e);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (e) {
    console.error("Failed to save state", e);
  }
};

// Preload state from localStorage
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    //@ts-ignore
    user: loginReducer,
    filter: filterSlice,
    cars: carSlise,
    refetch: refechSlice,
  },
  preloadedState,
});
store.subscribe(() => {
  saveState(store.getState().user);
});

export default store;
