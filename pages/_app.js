import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { withRouter } from "next/router";
import "../styles/globals.css";
import React from "react";
import "antd/dist/reset.css";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
