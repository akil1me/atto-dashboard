import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const RootLayout = () => {
  const { token } = useSelector((state: RootState) => state.login);
  const [url, setUrl] = useState<string>("");

  const { pathname } = useLocation();

  // useEffect(() => {
  //   if (!token && !pathname.includes("login")) {
  //     setUrl(pathname);
  //   }
  // }, [pathname, token]);

  if (!token && !pathname.includes("login")) {
    return <Navigate to={"/login"} />;
  }

  if (token && pathname.includes("login")) {
    return <Navigate to={url || "/dashboard"} />;
  }

  return <Outlet />;
};
