import { useEffect, useState } from "react"
import ProductList from "../components/ProductList"
import SearchBar from "../components/SearchBar"
import useDebounce from "../../../hooks/useDebounce"
import CategoryDropdown from "../../category/components/CategoryDropdown"
import ProductSortDropdown from "../components/ProductSortDropdown"
import PriceRangeSlider from "../components/PriceRangeSlider"
import useProducts from "../hooks/useProducts"
import Pagination from "../components/Pagination"




const ProductPage = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setselectedCategory] = useState<number | null>(null);
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(0);
    const [page, setPage] = useState(1);

    const limit = 10;
    const skip = (page - 1) * limit;

    const debouncedSearch = useDebounce(search, 500);

    const { data, isPending, isError, error } = useProducts(debouncedSearch, selectedCategory, sort, undefined, maxPrice, skip, limit);

    
    const totalPages = Math.ceil((data?.total ?? 0 )/ limit);


    useEffect(() => {
        if (!data) return;
        
        if (maxPrice === 0){
            setMaxPrice(data.available_max_price)
        }

    }, [data, maxPrice])


    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, selectedCategory, sort, maxPrice])

    const handleSearchChange = (value: string) => {
        setSearch(value)
    }

    const handleCategoryChange = (categoryId: number | null) => {
        setselectedCategory(categoryId)
    }

    const handleSortChange = (value: string) => {
        setSort(value);
    }

    const handleMaxPriceChange = (value: number) => {
        setMaxPrice(value);
    };

    const handlePageChange = (value:number) => {
        setPage(value);
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">
                Products
            </h1>

            <div className="mb-6">
                <SearchBar
                    search={search}
                    onSearchChange={handleSearchChange}
                />
            </div>

            <div className="flex justify-between gap-4 mb-6">
                <CategoryDropdown selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

                <ProductSortDropdown sort={sort} onSortChange={handleSortChange} />

                <PriceRangeSlider
                    value={maxPrice}
                    min={data?.available_min_price ?? 0}
                    max={data?.available_max_price ?? 1000000}
                    onValueChange={handleMaxPriceChange} />
            </div>
            <ProductList
                products={data?.data ?? []}
                isPending={isPending}
                isError={isError}
                error={error}
            />

            <Pagination 
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default ProductPage
