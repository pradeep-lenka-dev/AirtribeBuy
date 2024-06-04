import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../container/AppLayout";
import HomePage from "../pages/HomePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";

import PrivateRouter from "./PrivateRouter";
import WishListPage from "../pages/WishListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRouter>
            <CartPage />
            <HomePage />
          </PrivateRouter>
        ),
      },
      {
        path:"/wishlist",
        element:<WishListPage/>
      },
      {
        path: "/checkout",
        element: <p>Checkout page</p>,
      },
    ],
  },
]);

export default function MainAppRouter() {
  return <RouterProvider router={router} />;
}
