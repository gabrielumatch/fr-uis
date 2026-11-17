import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/components.css";
import { App } from "./App";
import { WorkshopProvider } from "./context/WorkshopContext";
import { bootstrapWorkshopFromUrl } from "./data/workshop/bootstrap-url";

bootstrapWorkshopFromUrl();

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <WorkshopProvider>
        <App />
      </WorkshopProvider>
    </StrictMode>,
  );
}