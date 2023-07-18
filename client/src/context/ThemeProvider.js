import { createTheme } from "@mui/material";

const theme = createTheme({
    // COLOR PALETTE
  palette: {
    primary: {
      main: "#0A1929",
    },
    secondary: {
      main: "#252627",
    },
    backgroundColor: {
      main: "#252627",
    },
  },
      // BUTTON STYLING
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          textDecoration: "none",
          padding: "8px 16px",
          margin: "0 4px",
          borderRadius: "4px",
          backgroundColor: "#0A1929",
        },
      },
    },
  },
});

export default theme;
