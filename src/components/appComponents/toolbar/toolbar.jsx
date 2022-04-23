import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { blueGrey, grey } from "@mui/material/colors";

const AppToolbar = () => {
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
    ></Toolbar>
  );
};

export default AppToolbar;
