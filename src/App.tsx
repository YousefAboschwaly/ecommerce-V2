import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./MyComponents/Home";
import NotFound from "./MyComponents/NotFound";
import Layout from "./MyComponents/Layout";
import Products from "./MyComponents/Products";
import Login from "./MyComponents/Login";
import SignUp from "./MyComponents/SignUp";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./MyComponents/ProtectedRoute";
import ForgetPassword from "./MyComponents/ForgetPassword";
import ProductDetails from "./MyComponents/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import Cart from "./Pages/Cart";
import WishList from "./Pages/WishList";
import WishlistContextProvider from "./Context/WishlistContext";
import Categories from "./Pages/Categories";
import Brands from "./Pages/Brands";
import { Checkout } from "./Pages/Checkout";
import { Orders } from "./Pages/Orders";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "Allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },

        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "forgot-password", element: <ForgetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  const query = new QueryClient();

  return (
    <>
  <QueryClientProvider client={query}>
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>

        <RouterProvider router={routes} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </WishlistContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
    </>
  );
}

export default App;
