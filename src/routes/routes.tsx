import { Navigate, createBrowserRouter } from "react-router-dom";
import { DashboardLayout, RootLayout } from "../layout";
import Home from "../pages/home";
import Metro from "../pages/metro";
import NotFound from "../pages/not-found";
import Login from "../pages/login";
import Trips from "../pages/trips";
import Tariffs from "../pages/tariffs";
import CardBin from "../pages/card-bin";
import StatisticsMetro from "../pages/statistics-metro";
import Aggreagators from "../pages/aggreagators";
import StatisticsUsers from "../pages/statistics-users";
import Regions from "../pages/regions";
import Ratings from "../components/ratings";
import StatisticsBus from "../pages/bus";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import AllPages from "../pages/all-pages";

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
            path: "trips",
            element: <Trips />,
          },
          {
            path: "tariffs",
            element: <Tariffs />,
          },
          {
            path: "bins",
            element: <CardBin />,
          },
          {
            path: "aggregators",
            element: <Aggreagators />,
          },
          {
            path: "regions",
            element: (
              <ErrorBoundary>
                <Regions />
              </ErrorBoundary>
            ),
          },
          {
            path: "ratings",
            element: <Ratings />,
          },
          {
            path: "all-charts",
            element: <AllPages />,
          },
          {
            path: "statistics",
            children: [
              {
                index: true,
                element: <Navigate to={"metro"} />,
              },
              {
                path: "metro",
                element: <StatisticsMetro />,
              },

              {
                path: "bus",
                element: <StatisticsBus />,
              },

              {
                path: "users",
                element: <StatisticsUsers />,
              },
            ],
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
