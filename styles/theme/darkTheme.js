import { blueGrey, grey, green, orange, red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: blueGrey[50],
      light: blueGrey[50],
      dark: blueGrey[50],
    },
    secondary: {
      main: blueGrey[50],
      light: blueGrey[50],
      dark: blueGrey[50],
    },
    error: {
      main: red[800],
      light: red[50],
    },
    success: {
      main: green[800],
      light: green[50],
    },
    warning: {
      main: orange[800],
      light: orange[50],
    },
  },
  // typography: {
  //   body1: {
  //     color: blueGrey[800],
  //   },
  //   body2: {
  //     color: blueGrey[1000],
  //   },
  //   tableHeader: {
  //     color: blueGrey[800],
  //   },
  //   subtitle1: {
  //     color: blueGrey[800],
  //   },
  //   subtitle2: {
  //     color: blueGrey[800],
  //   },
  //   h2: {
  //     color: grey[800],
  //   },
  //   h4: {
  //     color: grey[900],
  //   },
  //   h5: {
  //     color: grey[900],
  //   },
  //   h6: {
  //     color: blueGrey[400],
  //   },
  // },
};

export default darkTheme;
