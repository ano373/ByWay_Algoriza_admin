import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./page/DashboardPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import InstructorsPage from "./page/InstructorsPage.tsx";
import { LayoutWithSideBar } from "./components/UI/LayoutWithSideBar.tsx";
import CoursesPage from "./page/coursesPage.tsx";
import { Toaster } from "react-hot-toast";
import { CourseFormPage } from "./page/CourseFormPage.tsx";
import { ProtectedRoute } from "./components/UI/ProtectedRoute.tsx";
import LoginPage from "./page/LoginPage.tsx";
import NotFoundPage from "./page/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    element: <LayoutWithSideBar />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        ),
      },
      { path: "/instructors", element: <InstructorsPage /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/courses/add", element: <CourseFormPage mode="add" /> },
      {
        path: "/courses/:courseId/view",
        element: <CourseFormPage mode="view" />,
      },
      {
        path: "/courses/:courseId/edit",
        element: <CourseFormPage mode="edit" />,
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
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
