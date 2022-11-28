import "../styles/globals.css";
import React from "react";
import "antd/dist/reset.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
