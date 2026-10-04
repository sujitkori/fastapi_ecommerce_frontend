import { getApiErrorMessage } from "../../../utils/apiError";
import useCategories from "../hooks/useCategories";

interface CategoryDropdownProps {
  selectedCategory: number | undefined;
  onCategoryChange: (categoryId: number | undefined) => void;
}

const CategoryDropdown = ({
  selectedCategory,
  onCategoryChange,
}: CategoryDropdownProps) => {
  const { data, isPending, isError, error } = useCategories();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onCategoryChange(value === "" ? undefined : Number(value));
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <h2 className="text-red-600">
        {getApiErrorMessage(error, "Failed to load categories.")}
      </h2>
    );
  }

  return (
    <select
      value={selectedCategory ?? ""}
      onChange={handleChange}
      className="border border-gray-300 rounded-lg px-4 py-2"
    >
      <option value="">All Categories</option>
      {data.map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        );
      })}
    </select>
  );
};

export default CategoryDropdown;
