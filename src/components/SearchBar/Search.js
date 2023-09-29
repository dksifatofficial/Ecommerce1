"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from './style.module.css'

function Search({
  results = [],
  renderItem,
  value,
  onChange,
  onSelect,
  allProducts,
}) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const router = useRouter();

  const handleSelection = (selectedIndex) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect && onSelect(selectedItem);
    router.push(`/product/${selectedItem._id}`);
    resetSearchComplete();
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  const handleKeyDown = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    // move down
    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % results.length;

    // move up
    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;

    // hide search results
    if (key === "Escape") {
      resetSearchComplete();
    }

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }

    setFocusedIndex(nextIndexCount);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setDefaultValue(value);

    // Filter results based on whether the input value is found anywhere in the product name
    const filteredResults = value
      ? allProducts.filter((product) => {
          const productName = product.name.toLowerCase();
          const searchTerm = value.toLowerCase();
          const isMatch = productName.includes(searchTerm);
          console.log(
            `Product: ${productName}, Search Term: ${searchTerm}, Match: ${isMatch}`
          );
          return isMatch;
        })
      : [];

    onChange && onChange(e, filteredResults);
  };

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true);

    if (results.length <= 0) setShowResults(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  useEffect(() => {
    if (value) setDefaultValue(value);
  }, [value]);

  console.log(defaultValue);

  return (
    <div className="flex items-center justify-center">
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        onKeyDown={handleKeyDown}
        className="relative"
      >
        <input
          value={defaultValue}
          onChange={handleChange}
          type="text"
          className="w-[500px] px-5 py-0 text-sm h-8 rounded-lg focus:border-gray-700 
           outline-none transition"
          placeholder="Search in Daraz..."
        />

        {/* Search Results Container */}
        {showResults && (
          <div
            className={`absolute mt-1 w-full p-2 bg-white shadow-lg rounded 
           max-h-[500px] overflow-y-auto ${styles.style4}`}
          >
            {results && results.length
              ? results
                  .filter((item) => item.category !== "premium")
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        onMouseDown={() => handleSelection(index)}
                        ref={index === focusedIndex ? resultContainer : null}
                        style={{
                          backgroundColor:
                            index === focusedIndex ? "bg-blue-600" : "",
                        }}
                        className="cursor-pointer hover:bg-blue-600 hover:bg-opacity-10 p-2"
                      >
                        {renderItem(item)}
                      </div>
                    );
                  })
              : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
