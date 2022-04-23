import "../styles/globals.css";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import configureStore from "../src/store/configureStore";
const store = configureStore();

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  return getLayout(
    <Fragment>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} key={router.asPath} />
      </Provider>
    </Fragment>
  );
}

export default MyApp;
