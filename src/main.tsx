import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { routes } from "./routes/routes";
import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { antdThemes, queryClient } from "./utils";
import { Provider } from "react-redux";
import { store } from "./redux";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { useLocalStorage } from "usehooks-ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div>loading...</div>}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactToast />
      </QueryClientProvider>
    </Provider>
  </Suspense>
);

function App() {
  const [dark] = useLocalStorage("dark", true);
  return (
    <ConfigProvider theme={dark ? antdThemes.dark : antdThemes.light}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

function ReactToast() {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              <div className="flex items-center gap-2">
                {icon}
                {message}
                {t?.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
