import { createTheme } from "@mui/material";

const theme = createTheme({
  // COLOR PALETTE
  palette: {
    primary: {
      main: "#0A1929",
    },
    secondary: {
      main: "#9c27b0",
    },
    error: {
      main: "#B3261E",
      },
    neutral: {
      main: '#006399',
    },
    background: {
      main: '#2B2930'
    }
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
        //   backgroundColor: "#0A1929",
        },
      },
    },
  },
});

export default theme;
