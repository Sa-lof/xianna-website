import React, { useState } from "react";
import SideBar from "../components_dashboard/Sidebar/Sidebar";
import CatalogoTable from "../components_dashboard/TableCatalogo_D/TableCatalogo";
import BlogsTable from "../components_dashboard/TableBlogs_D/TableBlogs";
import CuestionarioTable from "../components_dashboard/TableCuestionario_D/TableCuestionario";
import UsersTable from "../components_dashboard/TableUsers_D/TableUsers";
import Insights from "../components_dashboard/Insights_D/Insights";
import { Box } from "@mui/material";
import '../../src/App.css';

const Dashboard: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('insights');
  const sidebarWidth = 250; // Ancho fijo de la SideBar
  const sidebarHeight = '100vh'; // Alto fijo de la SideBar

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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box sx={{ width: `${sidebarWidth}px`, height: `${sidebarHeight}`, position: 'fixed' }}>
        <SideBar selectedKey={selectedKey} onSelect={setSelectedKey} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: 2, sm: 3, md: 3, lg: 4, xl: 4 },
          marginLeft: `${sidebarWidth}px`,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {renderTable()}
      </Box>
    </Box>
  );
};

export default Dashboard;
