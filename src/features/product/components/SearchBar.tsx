import type React from "react";

interface SearchBarProps {
    search:string;
    onSearchChange: (value:string) => void;
}

const SearchBar = ({search, onSearchChange}:SearchBarProps) => {

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    }
    
  return (
    <div className="">
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
  )
}

export default SearchBar
