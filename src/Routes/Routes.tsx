import Layout from "@/Layout/Layout";
import About from "@/Pages/About/About";
import Contact from "@/Pages/Contact/Contact";

import Experience from "@/Pages/Experience/Experience";
import Home from "@/Pages/Home/Home";
import Projects from "@/Pages/Projects/Projects";
import QuickView from "@/Pages/Quick-View/QuickView";
import TechStack from "@/Pages/TechStack/TechStack";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: Home },
      { path: "projects", Component: Projects },
      { path: "stack", Component: TechStack },
      { path: "experience", Component: Experience },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "quick-view", Component: QuickView },
    ],
  },
]);

export default router;
