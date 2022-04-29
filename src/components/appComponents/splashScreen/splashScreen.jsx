// React, Next
import React from "react";

// Styling
import { CircularProgress, Box } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const SplashScreen = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: blueGrey[50],
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        left: 0,
        p: 3,
        position: "fixed",
        top: 0,
        width: "100vw",
        zIndex: 2000,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default SplashScreen;
