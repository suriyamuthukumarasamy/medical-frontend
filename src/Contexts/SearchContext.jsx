// src/Contexts/SearchContext.js
import React, { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [bar, setBar] = useState('');
  const [category, setCategory] = useState('All');

  return (
    <SearchContext.Provider value={{ bar, setBar, category, setCategory }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
