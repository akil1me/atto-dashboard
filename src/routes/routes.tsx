import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
]);
