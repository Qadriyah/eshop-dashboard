import React from "react";
import { IoSearchOutline } from "react-icons/io5";

type Iprops = {
  searchQuery: string;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<Iprops> = ({
  searchQuery,
  handleSearch,
  onChange,
}) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="h-[40px] flex">
        <input
          type="text"
          name="product"
          value={searchQuery}
          onChange={onChange}
          className="bg-[#f1f0f0] h-[40px] px-4 outline-none rounded-tl-md rounded-bl-md w-full"
          placeholder="Search Product"
        />
        <button
          className="h-[40px] px-4 bg-[#f1f0f0] rounded-tr-md rounded-br-md flex items-center justify-center hover:bg-gray-200"
          type="submit"
        >
          <IoSearchOutline fill="gray" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
