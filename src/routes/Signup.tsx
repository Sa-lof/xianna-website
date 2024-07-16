import React, { useState } from "react";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Slide,
  Fade,
  Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LargeButton from "../components/LargeButton/LargeButton";

const pink = "#E61F93";
const lightpink = "#FFD3E2";

const AuthForm = ({ isLogin }: { isLogin: boolean }) => (
  <Box
    sx={{
      padding: 6,
      margin: "auto",
      maxWidth: 450,
    }}
  >
    <Grid container spacing={3}>
      {!isLogin && (
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Nombre"
            InputLabelProps={{
              style: { color: pink, fontWeight: "bold" },
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: lightpink,
                },
                "&.Mui-focused fieldset": {
                  borderColor: lightpink,
                },
              },
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          label="Correo"
          InputLabelProps={{ style: { color: pink, fontWeight: "bold" } }}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: lightpink,
              },
              "&.Mui-focused fieldset": {
                borderColor: lightpink,
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          label="Contraseña"
          type="password"
          InputLabelProps={{ style: { color: pink, fontWeight: "bold" } }}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: lightpink,
              },
              "&.Mui-focused fieldset": {
                borderColor: lightpink,
              },
            },
          }}
        />
      </Grid>
      {!isLogin && (
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            InputLabelProps={{
              style: { color: pink, fontWeight: "bold" },
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: lightpink,
                },
                "&.Mui-focused fieldset": {
                  borderColor: lightpink,
                },
              },
            }}
          />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      >
        <LargeButton
          backgroundColor="white"
          arrowColor={pink}
          textColor={pink}
          link="/send"
          text={isLogin ? "Iniciar Sesión" : "Registrarse"}
        />
      </Grid>
    </Grid>
  </Box>
);

const Signup: React.FC = () => {
  const [tab, setTab] = useState("Iniciar Sesión");
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#fff",
            paddingBottom: 10, // Responsive padding
            paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
            paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
            paddingTop: 5,
          }}
        >
          <Box
            sx={{
              justifyContent: "center",
              marginBottom: 7,
              display: "flex",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: pink,
                width: 100,
                height: 100,
                "&:hover": {
                  backgroundColor: pink,
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "none",
                },
              }}
              onClick={() => navigate("/")}
            >
              <CloseIcon sx={{ fontSize: 40, color: "white" }} />
            </IconButton>
          </Box>
          <Grid container sx={{ flexGrow: 1 }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 3,
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 4,
                }}
              >
                <img src="" alt="login"/>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 6,
                }}
              >
                <img src="/path/to/logo.png" alt="Xianna Logo" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <Tabs
                  value={tab}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "center",
                    },
                    "& .MuiTab-root": {
                      textTransform: "none",
                      borderRadius: "16px",
                      margin: "0 8px",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      color: "black",
                      "&.Mui-selected": {
                        backgroundColor: pink,
                        color: "white",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                >
                  <Tab label="Iniciar Sesión" value="Iniciar Sesión" />
                  <Tab label="Registrarse" value="Registrarse" />
                </Tabs>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AuthForm isLogin={tab === "Iniciar Sesión"} />
              </Box>
            </Grid>
          </Grid>
          <Footer />
        </Box>
      </Fade>
    </Slide>
  );
};

export default Signup;
