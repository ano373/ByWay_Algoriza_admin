import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./page/Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
