import useCategories from "../../../category/hooks/useCategories";
import useAdminProducts from "../../products/hooks/useAdminProducts";
import DashboardStatsCard from "../components/DashboardStatsCard";

const AdminDashboardPage = () => {
  const {
    data: productsData,
    isPending: isProductsPending,
    isError: isProductsError,
  } = useAdminProducts({
    skip: 0,
    limit: 1,
  });

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useCategories();

  const stats = [
    {
      title: "Total Products",
      value: productsData?.total ?? 0,
      description: "Products in your store",
    },
    {
      title: "Total Categories",
      value: categories?.length ?? 0,
      description: "Categories in your store",
    },
    {
      title: "Total Users",
      value: "—",
      description: "Coming soon",
    },
    {
      title: "Total Orders",
      value: "—",
      description: "Coming soon",
    },
  ];

  const isPending = isProductsPending || isCategoriesPending;

  const isError = isProductsError || isCategoriesError;

  if (isPending) {
    return <p>Loading dashboard...</p>;
  }

  if (isError) {
    return <p>Failed to load dashboard.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        <p className="mt-1 text-sm text-gray-500">Overview of your store</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          return (
            <DashboardStatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
