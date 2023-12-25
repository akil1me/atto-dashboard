import { Navigate, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout";
import Home from "../pages/home";
import Metro from "../pages/metro";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "metro",
        element: <Metro />,
      },
    ],
  },
]);
