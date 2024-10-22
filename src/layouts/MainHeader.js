import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "../components/Logo";
import { Avatar, Divider } from "@mui/material";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useFrappeAuth } from "frappe-react-sdk";
import { useAuth } from "../context/AuthContext";

function MainHeader() {
  const { currentUser } = useFrappeAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // console.log("main header", user, currentUser);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {currentUser}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/change_password"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Change Password
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/register"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Create Account
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ mx: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    // <Box sx={{ mb: 3, flexGrow: 1 }}>
    <AppBar position="fixed" color="info" sx={{ zIndex: "9999" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Logo />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Chikorita ERP
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Avatar
          src={user?.user_image}
          alt={user?.name}
          onClick={handleProfileMenuOpen}
        />

        {renderMenu}
      </Toolbar>
    </AppBar>
    // </Box>
  );
}

export default MainHeader;
