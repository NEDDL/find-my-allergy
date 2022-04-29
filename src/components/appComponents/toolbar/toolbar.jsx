// React, Next
import React from "react";

// Auth
import { useAuth } from "../../../hooks/useAuth";

// Styling
import { blueGrey, grey } from "@mui/material/colors";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
// Icons
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const AppToolbar = ({ showMenu, setShowMenu }) => {
  const auth = useAuth();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Toolbar
      disableGutters
      sx={{
        minHeight: 64,
        left: 0,
        px: 2,
        backgroundColor: "white",
        color: grey[800],
        borderBottomColor: grey[200],
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
      }}
    >
      <IconButton
        onClick={() => handleMenu()}
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        {showMenu ? <ArrowBackIosNewIcon /> : <MenuIcon />}
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, userSelect: "none" }}
      >
        Find my allergy
      </Typography>
      <Button onClick={() => auth.logout()} variant="contained">
        Logout
      </Button>
    </Toolbar>
  );
};

export default AppToolbar;
