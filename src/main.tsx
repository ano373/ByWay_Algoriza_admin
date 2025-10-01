import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./page/Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InstructorsPage from "./page/Instructors.tsx";
import { LayoutWithSideBar } from "./components/UI/LayoutWithSideBar.tsx";
import CoursesPage from "./page/courses.tsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    element: <LayoutWithSideBar />,
    children: [
      { path: "/", element: <App /> },
      { path: "/instructors", element: <InstructorsPage /> },
      { path: "/courses", element: <CoursesPage /> },
    ],
  },
  { path: "*", element: <div>404 Not Found</div> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>
);
