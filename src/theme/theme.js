import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "grey", // Set your custom color here
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#00FF9C", // Custom primary color
    },
    secondary: {
      main: "#9c27b0", // Custom secondary color
    },
    background: {
      default: "#F4F6FF", // Background color
    },
    text: {
      primary: "#3C3D37", // Primary text color
      secondary: "#FFFFFF",
    },
  },
});
