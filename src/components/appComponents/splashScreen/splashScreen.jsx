import { CircularProgress } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";

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
