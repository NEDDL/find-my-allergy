// React, Next
import React, { useState } from "react";

// Styling
import { Box, AppBar as MuiAppBar } from "@mui/material";

// Components
import SidebarMenu from "./appComponents/sideMenu/sideMenu";
import AppToolbar from "./appComponents/toolbar/toolbar";
import { styled, useTheme } from "@mui/material/styles";

const AppLayout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);

  const drawerWidth = 280;

  const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    padding: 0,
    marginLeft: `-${drawerWidth}px`,
    ...(showMenu && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(showMenu && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <AppBar elevation={0}>
        <AppToolbar setShowMenu={setShowMenu} showMenu={showMenu} />
      </AppBar>
      <SidebarMenu
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        drawerWidth={drawerWidth}
      />
      <Main>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#f2f2f2",
            minHeight: "100vh",
            mb: 0,
          }}
        >
          {children}
        </Box>
      </Main>
    </Box>
  );
};

export default AppLayout;
