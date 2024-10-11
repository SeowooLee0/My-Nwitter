import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import store from "./redux/store";

axios.defaults.baseURL = process.env.BACKEND_URL;
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
