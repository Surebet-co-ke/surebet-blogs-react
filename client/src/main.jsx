import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from "react-redux";

import App from './App.jsx'
import store from "./store.js";

const theme = extendTheme({
  colors: {
    brandRed: "#E92569",
    brandBlue: "#24367E",
    brandGrey: "#F5F5F5",   
    jpBlue: "#525F7F",
  },
  styles: {
    global: {
      body: {
        fontFamily: "Open Sans, sans-serif",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider> 
    </Provider>     
  </React.StrictMode>,
)
