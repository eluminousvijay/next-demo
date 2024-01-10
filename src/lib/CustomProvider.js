'use client'
import React from 'react';
import { Provider } from "react-redux";
import store from "./store";

function CustomProvider({children}) {
  console.log('store......',store);
  return (
    <Provider store={store}>
      {/* <Component {...pageProps} /> */}
      {children}
    </Provider>
  );
}

export default CustomProvider;