import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InsightsIcon from '@mui/icons-material/Insights';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/Create';
import Table from '../TableCatalogo/TableCatalogo';
import TableBlogs from '../TableBlogs/TableBlogs';
import Accordion from '../Accordion/Accordion';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('Insights');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (text: string) => {
    setContent(text);
  };

  const menuItems = [
    { text: 'Insights', icon: <InsightsIcon /> },
    { text: 'Usuarios', icon: <PeopleIcon /> },
    { text: 'Catálogo', icon: <StoreIcon /> },
    { text: 'Formulario', icon: <AssignmentIcon /> },
    { text: 'Blogs', icon: <CreateIcon /> }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor: "#E61F93"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Xianna
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleMenuItemClick(item.text)} // Manejar clics en los botones del menú
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        {content === 'Insights' && (
          <Typography paragraph>
            Contenido de Insights: Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </Typography>
        )}
        {content === 'Usuarios' && (
          <Typography paragraph>
            Contenido de Usuarios: Pulvinar elementum integer enim neque volutpat ac tincidunt...
          </Typography>
        )}
        {content === 'Catálogo' && (
            <>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" component="h2" fontWeight="bold">
                        Catálogo
                    </Typography>
                    <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                        <Button variant="contained" color="secondary" startIcon={<ArrowDropDownIcon />} sx={{ backgroundColor: '#E61F93', color: '#fff', mr: 2 }}>
                            Reporte
                        </Button>
                        <Button variant="contained" color="secondary" startIcon={<AddIcon />} sx={{ backgroundColor: '#E61F93', color: '#fff' }}>
                            Agregar
                        </Button>
                    </Box>
                </Box>
                <Table />
            </>
        )}
        {content === 'Formulario' && (
          <>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h2" fontWeight="bold">
                  Formulario
              </Typography>
              <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                  <Button variant="contained" color="secondary" startIcon={<ArrowDropDownIcon />} sx={{ backgroundColor: '#E61F93', color: '#fff', mr: 2 }}>
                      Reporte
                  </Button>
                  <Button variant="contained" color="secondary" startIcon={<AddIcon />} sx={{ backgroundColor: '#E61F93', color: '#fff' }}>
                      Agregar
                  </Button>
              </Box>
          </Box>
          <Accordion />
      </>
        )}
        {content === 'Blogs' && (
            <>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" component="h2" fontWeight="bold">
                        Blogs
                    </Typography>
                    <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                        <Button variant="contained" color="secondary" startIcon={<ArrowDropDownIcon />} sx={{ backgroundColor: '#E61F93', color: '#fff', mr: 2 }}>
                            Reporte
                        </Button>
                        <Button variant="contained" color="secondary" startIcon={<AddIcon />} sx={{ backgroundColor: '#E61F93', color: '#fff' }}>
                            Agregar
                        </Button>
                    </Box>
                </Box>
                <TableBlogs />
            </>
        )}
      </Box>
    </Box>
  );
}
