import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";
import ProfilePage from "../features/auth/pages/ProfilePage";
import ProductPage from "../features/product/pages/ProductPage";
import ProductDetailPage from "../features/product/pages/ProductDetailPage";
import CartPage from "../features/cart/pages/CartPage";
import OrdersPage from "../features/orders/pages/OrdersPage";
import OrderDetailsPage from "../features/orders/pages/OrderDetailsPage";
import MainLayout from "../layouts/MainLayout";
import AdminRoute from "../components/common/AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboardPage from "../features/admin/dashboard/pages/AdminDashboardPage";
import AdminOrdersPage from "../features/admin/orders/pages/AdminOrdersPage";
import AdminProductsPage from "../features/admin/products/pages/AdminProductsPage";
import AdminCategoriesPage from "../features/admin/categories/pages/AdminCategoriesPage";
import AdminPaymentsPage from "../features/admin/payment/pages/AdminPaymentsPage";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true, //Notice: We used index instead of path Because, "If there is no extra path after the parent (/admin), React Router renders the child marked with index: true inside the parent's <Outlet />."
        element: <AdminDashboardPage />,
      },
      {
        path: "orders",
        element: <AdminOrdersPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "categories",
        element: <AdminCategoriesPage />,
      },
      {
        path:"payments",
        element: <AdminPaymentsPage/>
      }
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
