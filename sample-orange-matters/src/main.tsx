import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@source/themes/orange-matters/tokens.scss";
import "@source/react/styles/globals.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
