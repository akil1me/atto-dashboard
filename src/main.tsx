import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { routes } from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes} />
);
