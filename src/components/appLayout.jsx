import { Box } from "@mui/system";
import React from "react";
import SidebarMenu from "./appComponents/sideMenu/sideMenu";
import AppToolbar from "./appComponents/toolbar/toolbar";

const AppLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <SidebarMenu />
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
        <AppToolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
