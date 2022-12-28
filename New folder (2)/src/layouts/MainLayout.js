import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, Outlet } from "react-router-dom";

import "./index.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MainLayout({ isAuthed }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // if (!isAuthed) return <Outlet />;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!isAuthed && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            open={open}
            sx={{ background: "#fff", boxShadow: "none" }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon sx={{ color: "#e25b9b" }} />
              </IconButton>
              <Typography variant="h6" noWrap component="div" color="#000">
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <Typography variant="h5" textTransform="uppercase" sx={{ ml: 2 }}>
                Mebel
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon sx={{ color: "#e25b9b" }} />
                ) : (
                  <ChevronLeftIcon sx={{ color: "#e25b9b" }} />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {[
                { page: "Profile", link: "/" },
                // { page: "Аналитика", link: "analytics" },
                // { page: "Покупатели", link: "client" },
                { page: "Product", link: "product" },
                // { page: "Заказы", link: "order" },
                // { page: "Услуги", link: "service" },
                // { page: "Счета к оплате", link: "accounts" },
                // { page: "Действия", link: "actions" },
                // { page: "Настройки", link: "setting" },
              ].map((text, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <NavLink
                    end
                    to={text.link}
                    className="Link"
                    style={{ width: open ? "max-content" : 0 }}
                  >
                    <ListItemButton
                      className="linkBox"
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 2 === 0 ? (
                          <InboxIcon
                            className="linkIcon"
                            sx={{ color: "#e25b9b" }}
                          />
                        ) : (
                          <MailIcon
                            className="linkIcon"
                            sx={{ color: "#e25b9b" }}
                          />
                        )}
                      </ListItemIcon>

                      <ListItemText
                        primary={text.page}
                        sx={{ opacity: open ? 1 : 0 }}
                      ></ListItemText>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ background: "#f6f6f8", flexGrow: 1, p: 3 }}
          >
            <DrawerHeader />
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
}
