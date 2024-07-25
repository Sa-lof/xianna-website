import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  Card,
  CardContent,
  Slide,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LargeButton from "../components/LargeButton/LargeButton";
import { useInView } from "react-intersection-observer";

const pink = "#E61F93";
const lightpink = "#FFD3E2";

const Contacto: React.FC = () => {
  const navigate = useNavigate();

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: socialRef, inView: socialInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh", // Full viewport height
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: 4,
          }}
        >
          <Grid container spacing={4} sx={{ maxWidth: 1200 }}>
            <Grid item xs={12} md={4}>
              <Fade in={headerInView} timeout={2000}>
                <div ref={headerRef}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                      fontSize: "50px",
                    }}
                  >
                    Contáctanos
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 4 }}>
                    Lorem ipsum lorem ipsum lorem ipsum lorem
                  </Typography>
                </div>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in={formInView} timeout={2000}>
                <div ref={formRef}>
                  <Card
                    sx={{
                      backgroundColor: lightpink,
                      padding: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Nombre"
                      InputLabelProps={{
                        style: { color: pink },
                      }}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: 5,
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
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Correo electrónico"
                      InputLabelProps={{
                        style: { color: pink },
                      }}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: 5,
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
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      label="Mensaje"
                      InputLabelProps={{
                        style: { color: pink },
                      }}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: 5,
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
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <LargeButton
                        backgroundColor="white"
                        arrowColor={pink}
                        textColor={pink}
                        link="/send"
                        text="Enviar"
                      />
                    </Box>
                  </Card>
                </div>
              </Fade>
            </Grid>
            <Grid item xs={12} md={2}>
              <Fade in={socialInView} timeout={2000}>
                <div ref={socialRef}>
                  <Card
                    className="flex flex-col items-center h-full"
                    sx={{ backgroundColor: pink, color: "white", padding: 2 }}
                  >
                    <CardContent
                      className="flex-grow flex items-center justify-center"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ marginBottom: 4 }}>
                        <IconButton
                          onClick={() =>
                            handleSocialClick(
                              "https://www.instagram.com/xianna/"
                            )
                          }
                        >
                          <InstagramIcon
                            sx={{ color: "white", fontSize: 45 }}
                          />
                        </IconButton>
                      </Box>
                      <Box sx={{ marginBottom: 4 }}>
                        <IconButton
                          onClick={() =>
                            handleSocialClick("https://wa.me/1234567890")
                          }
                        >
                          <WhatsAppIcon sx={{ color: "white", fontSize: 45 }} />
                        </IconButton>
                      </Box>
                      <Box sx={{ marginBottom: 4 }}>
                        <IconButton
                          onClick={() =>
                            handleSocialClick(
                              "https://www.facebook.com/xianna/"
                            )
                          }
                        >
                          <FacebookIcon sx={{ color: "white", fontSize: 45 }} />
                        </IconButton>
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Redes
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </div>
              </Fade>
            </Grid>
          </Grid>
        </Box>
        <Fade in={footerInView} timeout={2000}>
          <div ref={footerRef}>
            <Footer />
          </div>
        </Fade>
      </Box>
    </Slide>
  );
};

export default Contacto;
