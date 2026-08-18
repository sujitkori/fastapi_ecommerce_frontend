import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import useCart from "../../features/cart/hooks/useCart";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { data } = useCart();

  const cartCount =
    data?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          FastCart
        </Link>

        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600";
            }}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => {
              return isActive
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600";
            }}
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            Cart
            {cartCount > 0 && (
              <span
                className="
        absolute
        -top-2
        -right-5
        bg-red-600
        text-white
        text-xs
        rounded-full
        w-5
        h-5
        flex
        items-center
        justify-center
      "
              >
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) => {
              return isActive
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600";
            }}
          >
            My Orders
          </NavLink>

          {
            user?.role === "admin" && (
              <NavLink to="/admin">
                Admin Panel
              </NavLink>
            )
          }

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
