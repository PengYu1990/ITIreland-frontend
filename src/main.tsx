import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createHashRouter, RouterProvider } from "react-router-dom";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import Index from "./pages/Index";
import { LoginPage } from "./pages/LoginPage";

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserDetail from "./pages/UserDetail";
import AuthProvider from "./components/context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/post/:id",
        element: <PostDetail />,
      },
      {
        path: "/edit/:id?",
        element: (
          <ProtectedRoute>
            <PostEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login/:form?",
        element: <LoginPage />,
      },
      {
        path: "/user/:id",
        element: <UserDetail />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
