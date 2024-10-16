import React, { useState, useEffect } from "react";
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
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useInView } from "react-intersection-observer";
import Loader from "../components/Loader/Loader";
import emailjs from "emailjs-com";

const pink = "#E61F93";
const lightpink = "#FFD3E2";

const Contacto: React.FC = () => {

  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: 'xiannaoficial@gmail.com',
    message: '',
    reply_to: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado para manejar el loader

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simular tiempo de carga
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return <Loader />;
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!toSend.from_name || !toSend.to_name || !toSend.message || !toSend.reply_to) {
      setMessageSnackbar('Por favor, completa todos los campos');
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    emailjs.send(
      'service_ghjc3pq',
      'template_gqwjp6x',
      toSend,
      '7__nOmPuFW7JAk7fm'
    )
      .then((response) => {
        setMessageSnackbar('Correo enviado con éxito');
        setSeverity("success");
        setOpenSnackbar(true);

        // Limpiar los campos del formulario
        setToSend({
          from_name: '',
          to_name: 'xiannaoficial@gmail.com',
          message: '',
          reply_to: '',
        });
      })
      .catch((err) => {
        setMessageSnackbar('Hubo un error al enviar el correo. Intenta nuevamente.');
        setSeverity("error");
        setOpenSnackbar(true);
      });
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
                  En Xianna, valoramos tu opinión y estamos aquí para apoyarte en tu viaje de moda. Escríbenos a continuación y te responderemos lo antes posible. ¡Conéctate con nosotras!
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
                fullWidth
                label="Tu nombre"
                name="from_name"
                value={toSend.from_name}
                onChange={handleChange}
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
                fullWidth
                label="Correo electrónico"
                name="reply_to"
                value={toSend.reply_to}
                onChange={handleChange}
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
                fullWidth
                multiline
                rows={4}
                label="Mensaje"
                name="message"
                value={toSend.message}
                onChange={handleChange}
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
                    <Button 
  variant="contained" 
  sx={{ backgroundColor: "white", color: pink, borderRadius:'20px', "&:hover": {
    backgroundColor: "black",
    color: "white"
  }}} 
  onClick={sendEmail}
>
  Enviar
</Button>
{/* Snackbar para mostrar las alertas */}
<Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: "100%" }}>
            {messageSnackbar}
          </Alert>
        </Snackbar>
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
                              "https://www.instagram.com/xianna.mx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
