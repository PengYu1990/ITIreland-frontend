import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createHashRouter, RouterProvider } from "react-router-dom";
import PostDetail from "./PostDetail";
import PostEdit from "./PostEdit";
import Index from "./Index";
import { LoginPage } from "./pages/LoginPage";

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        element: <PostEdit />,
      },
      {
        path: "/login/:path?",
        element: <LoginPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
  <MantineProvider>
    <Notifications />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </MantineProvider>
  // </React.StrictMode>
);
