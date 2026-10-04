import { useState } from "react";
import useCategories from "../../../category/hooks/useCategories";
import CategoryTable from "../components/CategoryTable";
import CategoryFormModal from "../components/CategoryFormModal";
import { getApiErrorMessage } from "../../../../utils/apiError";

const AdminCategoriesPage = () => {
  const { data, isPending, isError, error } = useCategories();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-600">
          {getApiErrorMessage(error, "Failed to load categories.")}
        </p>
      </div>
    );
  }

  const handleCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <>
      <CategoryTable categories={data ?? []} onAddCategory={handleCategory} />

      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default AdminCategoriesPage;
