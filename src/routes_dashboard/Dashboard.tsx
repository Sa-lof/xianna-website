import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBar from "../components_dashboard/Sidebar/Sidebar";
import CatalogoTable from "../components_dashboard/TableCatalogo_D/TableCatalogo";
import BlogsTable from "../components_dashboard/TableBlogs_D/TableBlogs";
import CuestionarioTable from "../components_dashboard/TableCuestionario_D/TableCuestionario";
import UsersTable from "../components_dashboard/TableUsers_D/TableUsers";
import Insights from "../components_dashboard/Insights_D/Insights";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer"; // Asegúrate de importar el Footer
import { Box, IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import '../../src/App.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string>('insights');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const sidebarWidth = 250;
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/dashboard/login');
    } else {
      setLoading(false); // Deja de cargar una vez que se confirma la autenticación
    }
  }, [navigate]);

  const renderTable = () => {
    switch (selectedKey) {
      case 'usuarios':
        return <UsersTable />;
      case 'catalogo':
        return <CatalogoTable />;
      case 'formulario':
        return <CuestionarioTable />;
      case 'blogs':
        return <BlogsTable />;
      case 'insights':
      default:
        return <Insights />;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {isSmallScreen ? (
          <>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ position: 'fixed', top: 16, left: 16 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{ '& .MuiDrawer-paper': { width: sidebarWidth } }}
            >
              <SideBar selectedKey={selectedKey} onSelect={(key) => { setSelectedKey(key); setDrawerOpen(false); }} />
            </Drawer>
          </>
        ) : (
          <Box sx={{ width: `${sidebarWidth}px`, height: '100vh', position: 'fixed' }}>
            <SideBar selectedKey={selectedKey} onSelect={setSelectedKey} />
          </Box>
        )}
        <Box
          sx={{
            flexGrow: 1,
            padding: { xs: 4, sm: 3, md: 3, lg: 4, xl: 4 },
            marginLeft: isSmallScreen ? 0 : `${sidebarWidth}px`,
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          {loading ? <Loader /> : renderTable()}
          {/* Footer añadido */}
          <Box sx={{ marginTop: 'auto' }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
