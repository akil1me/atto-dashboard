import { Navigate, createBrowserRouter } from "react-router-dom";
import { DashboardLayout, RootLayout } from "../layout";
import Home from "../pages/home";
import Metro from "../pages/metro";
import NotFound from "../pages/not-found";
import Login from "../pages/login";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={"main"} />,
          },
          {
            path: "main",
            element: <Home />,
          },
          {
            path: "metro",
            element: <Metro />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
