import React, { useState, ChangeEvent, KeyboardEventHandler } from "react";
import styles from "./index.module.css";
import { SearchIcon } from "../icons";
import toast from "react-hot-toast";

interface SearchProps {
  updateSearchQuery: (query: string) => void;
  handleSearchFunc: (search?: string) => void;
  searchQuery: string;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const Search: React.FC<SearchProps> = ({
  updateSearchQuery,
  handleSearchFunc,
  searchQuery,
  handleKeyDown,
}) => {
  const [searchToggle, setSearchToggle] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(e.target.value);
  };

  return (
    <div className={styles.wrap}>
      {searchToggle && (
        <span
          className={styles.span}
          onClick={() => {
            if (!searchQuery) {
              toast.error("Please enter a city name");
              return;
            }
            handleSearchFunc();
          }}
        >
          <SearchIcon />
        </span>
      )}

      {searchToggle && (
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className={searchToggle ? styles.searchToggle : ""}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}

      <p onClick={() => setSearchToggle(!searchToggle)}>
        {!searchToggle && <SearchIcon />}
        <span>Search City</span>
      </p>
    </div>
  );
};

export default Search;
