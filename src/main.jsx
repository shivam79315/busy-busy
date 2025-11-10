import store from "./app/store.js";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import "./styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} />
    </StrictMode>
  </Provider>
);
