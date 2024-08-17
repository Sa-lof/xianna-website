import React, { useState, useEffect } from "react";
import MainGrid from "../components/MainGrid/MainGrid";
import MainGridLogged from "../components/MainGridLogged/MainGridLogged";
import { Box, Slide } from "@mui/material";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import { checkSession } from "../supabase/ProfileServices/checkSession";
import { getUserDetailsByEmail } from "../supabase/ProfileServices/getUserDetailsByEmail";

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
  );
};

export default Home;
