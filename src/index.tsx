import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../src/index.css";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import store from "./redux/store";

axios.defaults.baseURL = "http://localhost:1234";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
