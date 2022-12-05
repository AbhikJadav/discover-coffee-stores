import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { withRouter } from "next/router";
import "../styles/globals.css";
import React from "react";
import "antd/dist/reset.css";
import store from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
