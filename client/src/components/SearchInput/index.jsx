import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useTheme } from "../../utils/ThemeContext";

const SearchInput = ({ onSearch }) => {
  const { pinkTheme, toggleTheme } = useTheme(); // theme changung functionality
  const themeStyles = pinkTheme
    ? {
        background: "#f48fb1",
        transitionProperty: "background-color",
        transitionDuration: "300ms",
      }
    : {
        background: "#90caf9",
        transitionProperty: "background-color",
        transitionDuration: "300ms",
      };

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    /* console.log("search", search); */
    onSearch(search);
  };

  return (
    <div className="flex items-center justify-center w-2/3 bg-white p-4">
      <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative bg-white dark:bg-gray-700 rounded-md shadow-lg w-[250px]">
        <Input
          type="text"
          color="pink"
          placeholder="Send a message..."
          value={search}
          onChange={handleChange}
        />
        <div className="flex justify-center">
          <Button
            style={themeStyles}
            size="sm"
            className="mt-2 md:w-1/6 flex justify-center items-center"
            onClick={onClickSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
