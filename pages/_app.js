// import "../styles/globals.css";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import configureStore from "../src/store/configureStore";
const store = configureStore();

import GlobalStyle from "../styles/globalStyles";
import { blueGrey, grey, green, orange, red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material";
import lightTheme from "../styles/theme/lightTheme";
import baseOptions from "../styles/theme/baseOptions";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  return getLayout(
    <Fragment>
      <ThemeProvider theme={createTheme(baseOptions, lightTheme)}>
        <GlobalStyle />
        <Provider store={store}>
          <Toaster />
          <Component {...pageProps} key={router.asPath} />
        </Provider>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
