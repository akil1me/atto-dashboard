import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { routes } from "./routes/routes";
import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div>loading...</div>}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </Suspense>
);
