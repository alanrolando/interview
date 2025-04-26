import { createBrowserRouter, replace } from "react-router-dom";
//
import Root from "./Root";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import { useSelector } from "react-redux";

export const useRouter = () => {
  const isUserLoggedIn = useSelector(
    (state) => state.authReducer.isUserLoggedIn
  );

  const route = !!isUserLoggedIn ? "/dashboard" : "/login";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          //replaces all other routes with login/dashboard
          loader: async () => replace(route),
        },
        !!isUserLoggedIn
          ? {
              path: "dashboard",
              element: <Dashboard />,
            }
          : {
              path: "login",
              element: <Login />,
            },

        {
          path: "*",
          loader: async () => replace(route),
        },
      ],
    },
  ]);

  return { router };
};
