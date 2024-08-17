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
  Snackbar,
  Alert,
  Card,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LargeButton from "../components/LargeButton/LargeButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerUser, loginUser } from '../supabase/UsersServices/loginService';
import loginImage from "../assets/login/login.jpg";
import logo from "../assets/logo/xianna.png";
import { ArrowBack } from "@mui/icons-material";

const pink = "#E61F93";

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        setSeverity("error");
        setOpen(true);
        return;
      }
  
      await registerUser(email, password, name);
      setSeverity("success");
      navigate("/");
    } catch (error) {
      setMessage((error as Error).message);
      setSeverity("error");
    } finally {
      setOpen(true);
    }
  };
  
  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      setSeverity("success");
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('rating-')) {
          localStorage.removeItem(key);
        }
      });
      navigate("/");
    } catch (error) {
      setMessage((error as Error).message);
      setSeverity("error");
    } finally {
      setOpen(true);
    }
  };  

  return (
    <div
      style={{
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
                style: { color: pink },
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: pink,
                    borderRadius: 5,
                  },
                  "&:hover fieldset": {
                    borderColor: pink,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: pink,
                  },
                },
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Correo"
            InputLabelProps={{ style: { color: pink } }}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: pink,
                  borderRadius: 5,
                },
                "&:hover fieldset": {
                  borderColor: pink,
                },
                "&.Mui-focused fieldset": {
                  borderColor: pink,
                },
              }}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            InputLabelProps={{ style: { color: pink } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? (
                      <VisibilityOff sx={{ color: pink }} />
                    ) : (
                      <Visibility sx={{ color: pink }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: pink,
                  borderRadius: 5,
                },
                "&:hover fieldset": {
                  borderColor: pink,
                },
                "&.Mui-focused fieldset": {
                  borderColor: pink,
                },
              }}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        {!isLogin && (
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Confirmar Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              InputLabelProps={{
                style: { color: pink },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff sx={{ color: pink }} />
                      ) : (
                        <Visibility sx={{ color: pink }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: 10,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: pink,
                    borderRadius: 5,
                  },
                  "&:hover fieldset": {
                    borderColor: pink,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: pink,
                  },
                }}}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        >
          <LargeButton
            backgroundColor={pink}
            arrowColor="white"
            textColor="white"
            text={isLogin ? "Iniciar Sesión" : "Registrarse"}
            link="#"
            onClick={isLogin ? handleLogin : handleRegister}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

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
            paddingBottom: 5,
            paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
            paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
            paddingTop: 2,
          }}
        >
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
                  height: "100%",
                }}
              >
                <img src={loginImage} alt="login" />
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
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  top: 0,
                  left: 0,
                  margin: 2,
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: pink,
                    width: 70,
                    height: 70,
                    "&:hover": {
                      backgroundColor: pink,
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease-in-out",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  <ArrowBack sx={{ fontSize: 40, color: "white" }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <img
                  src={logo}
                  alt="Xianna Logo"
                  style={{
                    maxWidth: "70%",
                  }}
                />
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
                    marginBottom: 2,
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

              <div style={{ display: "flex", justifyContent: "center" }}>
                <AuthForm isLogin={tab === "Iniciar Sesión"} />
              </div>
            </Grid>
          </Grid>
          <Footer />
        </Box>
      </Fade>
    </Slide>
  );
};

export default Signup;
