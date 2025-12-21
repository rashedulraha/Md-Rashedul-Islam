import Layout from "@/Layout/Layout";
import Projects from "@/Pages/Projects/Projects";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
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
        Component: Projects,
      },
    ],
  },
]);

export default router;
