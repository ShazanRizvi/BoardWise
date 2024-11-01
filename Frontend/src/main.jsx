import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContextStore from "./context/AppContextStore.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextStore>
      <App />
    </AppContextStore>
  </StrictMode>
);
