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
import { AuthProvider } from "../src/contexts/authContext";

const AppWrapper = () => {};

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  return (
    <Fragment>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider theme={createTheme(baseOptions, lightTheme)}>
            <GlobalStyle />
            <Toaster />
            {getLayout(<Component {...pageProps} key={router.asPath} />)}
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </Fragment>
  );
}

export default MyApp;
