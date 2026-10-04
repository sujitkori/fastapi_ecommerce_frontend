import { useState } from "react";
import useCreateCategory from "../hooks/useCreateCategory";
import type { CategoryRequestData } from "../../../category/types/category.types";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../../../utils/apiError";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CategoryFormModal = ({ isOpen, onClose }: CategoryFormModalProps) => {
  const [formData, setFormData] = useState<CategoryRequestData>({
    name: "",
  });
  const { mutate: createCategory, isPending } = useCreateCategory();

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    createCategory(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
        });
        toast.success("Category Added Successfully");
        onClose();
      },
      onError:(error)=> {
        toast.error(getApiErrorMessage(error, "Failed to create category."))
      }
    });
  };

  if (!isOpen) {
    return;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Add Category</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-2xl text-gray-500 hover:text-gray-900"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div>
            <label
              htmlFor="category-name"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>

            <input
              id="category-name"
              type="text"
              value={formData.name}
              onChange={(event) => setFormData({ name: event.target.value })}
              placeholder="Enter category name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              {isPending ? "Creating...": "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
