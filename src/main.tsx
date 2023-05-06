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
  <React.StrictMode>
    <MantineProvider>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
