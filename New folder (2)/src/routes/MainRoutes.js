import { lazy } from "react";

import AuthGuard from "../auth/AuthGuard";
import MainLayout from "../layouts/MainLayout";
import Loadable from "../Loadable";
import ProductEdit from "../pages/ProductEdit";

const Home = Loadable(lazy(() => import("../pages/Home")));
const Product = Loadable(lazy(() => import("../pages/Product")));
const SignIn = Loadable(lazy(() => import("../pages/SignIn")));
const NotFound = Loadable(lazy(() => import("../components/NotFound")));

const MainRoutes = [
  {
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      { path: "product", element: <ProductEdit /> },
      {
        path: "product/:listId",
        element: <ProductEdit />,
      },
    ],
  },
  { path: "/session/signin", element: <SignIn /> },
  { path: "/session/404", element: <NotFound /> },
  { path: "/", element: <NotFound to="dashboard/default" /> },
  { path: "*", element: <NotFound /> },
];

export default MainRoutes;
