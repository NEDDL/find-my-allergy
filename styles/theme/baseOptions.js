import { blueGrey, grey, green, orange, red } from "@mui/material/colors";

const baseOptions = {
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "menuButtonDark" },
          style: {
            width: "80%",
            fontSize: "1em",
            lineHeight: 2.5,
            textAlign: "left",
            justifyContent: "flex-start",
            borderRadius: 2,
            color: blueGrey[50],

            "&:hover": {
              backgroundColor: blueGrey[800],
            },
          },
        },
      ],
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 300,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          backgroundColor: "#5048E5",
          height: 3,
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
        },
      },
    },
  },
  typography: {
    body1: {
      fontSize: 15,
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
    tableHeader: {
      fontSize: 16,
      fontWeight: 400,
    },
    subtitle1: {
      fontWeight: 400,

      fontSize: 15,
    },
    subtitle2: {
      fontWeight: 300,

      fontSize: 13,
    },
    h2: {
      fontSize: 36,
      fontWeight: 500,
      textTransform: "lowercase",
      "&:first-letter": { textTransform: "uppercase" },
    },
    h4: {
      fontWeight: 700,
      textTransform: "lowercase",
      "&:first-letter": { textTransform: "uppercase" },
    },
    h5: {
      fontWeight: 500,
      textTransform: "lowercase",
      "&:first-letter": { textTransform: "uppercase" },
    },
    h6: {
      fontSize: 15,
      fontWeight: 300,
      textTransform: "lowercase",
      "&:first-letter": { textTransform: "uppercase" },
    },
  },
};

export default baseOptions;
