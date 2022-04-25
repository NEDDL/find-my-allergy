// import "../styles/globals.css";
import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { Provider } from "react-redux";
import configureStore from "../src/store/configureStore";
const store = configureStore();

import GlobalStyle from "../styles/globalStyles";
import { createTheme, ThemeProvider } from "@mui/material";
import lightTheme from "../styles/theme/lightTheme";
import baseOptions from "../styles/theme/baseOptions";

import { Toaster } from "react-hot-toast";

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
