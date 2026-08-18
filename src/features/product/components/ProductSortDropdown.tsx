import type React from "react";

interface SortDropdownProps {
    sort: string;
    onSortChange: (value: string) => void;
}

const ProductSortDropdown = ({ sort, onSortChange }: SortDropdownProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(event.target.value)
    }

    
    return (
        <select
            value={sort}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
        >
            <option value="">Sort By</option>

            <option value="price_asc">
                Price: Low to High
            </option>

            <option value="price_desc">
                Price: High to Low
            </option>

            <option value="created_at_desc">
                Newest
            </option>

            <option value="created_at_asc">
                Oldest
            </option>

            <option value="name_asc">
                Name: A-Z
            </option>

            <option value="name_desc">
                Name: Z-A
            </option>
        </select>
    )
}

export default ProductSortDropdown;
