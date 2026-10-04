import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `px-4 py-2 rounded transition-colors ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800"
    }`;
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="flex flex-col w-64 shrink-0 bg-gray-900 text-white p-6 sticky top-0 h-screen">
        {" "}
        {/*shrink-0 will never shrink the element. It takes givenwidth/size */}
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            end // without end /admin matches /admin/orders, /admin/products, /admin/catgories. Because those URLs all start with /admin. So if you click /admin/orders, both Dashboadr and Orders would appear active. So by adding to="/admin" end you are saying Only mark Dashboard as active when the URL is exactly /admin.
            className={getNavLinkClass}
          >
            Dashboard
          </NavLink>

          <NavLink to="/admin/orders" className={getNavLinkClass}>
            Orders
          </NavLink>

          <NavLink to="/admin/products" className={getNavLinkClass}>
            Products
          </NavLink>

          <NavLink to="/admin/categories" className={getNavLinkClass}>
            Categories
          </NavLink>

          <NavLink to="/admin/payments" className={getNavLinkClass}>
            Payments
          </NavLink>
        </nav>

        <NavLink
            to="/"
            className="mt-auto rounded px-4 py-2 transition-colors hover:bg-gray-800"
          >
            Back to Store
          </NavLink>
      </aside>

      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
