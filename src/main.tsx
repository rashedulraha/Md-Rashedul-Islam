import "./index.css";

import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router/dom";
import router from "./Routes/Routes";
import { StrictMode } from "react";
import { ThemeProvider } from "./components/ui/themeProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
