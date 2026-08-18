import type { Category } from "../../../category/types/category.types";

interface CategoryProps {
    categories:Category[];
    onAddCategory: () => void;
}

const CategoryTable = ({categories, onAddCategory}:CategoryProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Categories</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your product categories
          </p>
        </div>

        <button
          type="button"
          onClick={onAddCategory}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                #
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Created At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {categories.map((category:Category, index:number) => (
              <tr
                key={category.id}
                className="transition-colors hover:bg-gray-50"
              >
                {/* Number */}
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {index + 1}
                </td>

                {/* Category name */}
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">
                    {category.name}
                  </span>
                </td>

                {/* Created date */}
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {new Date(category.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-900">
            No categories found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Create your first category to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
