import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Tailwind's shadow-lg equivalent
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderRadius: 5,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
              borderRadius: 5,
            },
          },
        },
      },
    },
  },
});

export default theme;
