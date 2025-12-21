import Layout from "@/Layout/Layout";
import Experience from "@/Pages/Experience/Experience";
import Home from "@/Pages/Home/Home";
import Projects from "@/Pages/Projects/Projects";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: Home },
      {
        path: "projects",
        Component: Projects,
      },
      {
        path: "stack",
        Component: Projects,
      },
      {
        path: "experience",
        Component: Experience,
      },
    ],
  },
]);

export default router;
