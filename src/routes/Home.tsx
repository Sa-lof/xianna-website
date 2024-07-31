import React, { useState, useEffect } from "react";
import MainGrid from "../components/MainGrid/MainGrid";
import MainGridLogged from "../components/MainGridLogged/MainGridLogged";
import { Box, Slide } from "@mui/material";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import supabase from "../supabaseClient";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userStyle, setUserStyle] = useState<string | number>("");

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session) {
        const user = session.user;
        const { data: userDetails, error } = await supabase
          .from('user_details')
          .select('nombre, tipo_estilo')
          .eq('correo', user.email)
          .single();
        
        if (userDetails) {
          setUserName(userDetails.nombre);
          setUserStyle(userDetails.tipo_estilo);
        } else {
          console.error('Error fetching user details:', error);
        }
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Slide direction="down" in={!loading} mountOnEnter unmountOnExit timeout={2000}>
      <Box
        sx={{
          paddingBottom: 4, // Responsive padding
          paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
          paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
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
