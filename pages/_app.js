// React, Next
import React, { Fragment } from "react";
import { useRouter } from "next/router";

// Auth
import { AuthProvider, AuthConsumer } from "../src/contexts/authContext";
import SplashScreen from "../src/components/appComponents/splashScreen/splashScreen";

// Redux
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "../src/store/configureStore";
const store = configureStore();

// Styling
import GlobalStyle from "../styles/globalStyles";
import { createTheme, ThemeProvider } from "@mui/material";
import lightTheme from "../styles/theme/lightTheme";
import baseOptions from "../styles/theme/baseOptions";

import { Toaster } from "react-hot-toast";

const AppWrapper = () => {};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Fragment>
      <ReduxProvider store={store}>
        <AuthProvider>
          <ThemeProvider theme={createTheme(baseOptions, lightTheme)}>
            <GlobalStyle />
            <Toaster />
            <AuthConsumer>
              {(auth) =>
                !auth.isInitialized ? (
                  <SplashScreen />
                ) : (
                  getLayout(<Component {...pageProps} key={router.asPath} />)
                )
              }
            </AuthConsumer>
          </ThemeProvider>
        </AuthProvider>
      </ReduxProvider>
    </Fragment>
  );
}

export default MyApp;
