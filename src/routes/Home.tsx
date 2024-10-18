import React, { useState, useEffect } from "react";
import MainGrid from "../components/MainGrid/MainGrid";
import MainGridLogged from "../components/MainGridLogged/MainGridLogged";
import { Box, Slide } from "@mui/material";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import { checkSession } from "../supabase/ProfileServices/checkSession";
import { getUserDetailsByEmail } from "../supabase/ProfileServices/getUserDetailsByEmail";
import { Helmet } from "react-helmet";
import x from "../assets/logo/x.png";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userStyle, setUserStyle] = useState<string | number>("");

  useEffect(() => {
    const initialize = async () => {
      try {
        const session = await checkSession();
        setIsAuthenticated(!!session);
        
        if (session) {
          const user = session.user;
          const userEmail = user.email;
  
          if (!userEmail) {
            throw new Error("User email is undefined");
          }
  
          const userDetails = await getUserDetailsByEmail(userEmail);
  
          setUserName(userDetails.nombre);
          setUserStyle(userDetails.tipo_estilo);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
  
    initialize();
  }, []);  

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Xianna</title>
        <meta name="description" content="En Xianna, descubre tu estilo único y las últimas tendencias en moda. Ya seas un usuario registrado o no, te ofrecemos una experiencia personalizada para explorar nuestros looks." />
        <meta name="keywords" content="Xianna, moda, estilo, tendencias, looks, guardarropa, moda personalizada, descubre tu estilo, últimas tendencias" />
        
        <meta property="og:title" content="Xianna" />
        <meta property="og:description" content="Explora las últimas tendencias de moda en Xianna. Descubre tu estilo y disfruta de una experiencia personalizada tanto si estás registrado como si no." />
        <meta property="og:image" content={x} />
        <meta property="og:url" content="https://xianna.com.mx/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Slide direction="down" in={!loading} mountOnEnter unmountOnExit timeout={2000}>
        <Box
          sx={{
            paddingBottom: 4, 
            paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, 
            paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, 
            paddingTop: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isAuthenticated ? (
              <MainGridLogged userName={userName} userStyleId={Number(userStyle)} />
            ) : (
              <MainGrid />
            )}
          </Box>

          <Footer />
        </Box>
      </Slide>
    </>
  );
};

export default Home;
