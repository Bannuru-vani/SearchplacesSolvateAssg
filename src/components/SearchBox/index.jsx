import React, { useState, useRef } from "react";
import "./styles.css";

const SearchBox = ({ setSearchText, searchText, onEnterPress }) => {
  const inputRef = useRef();
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && e.ctrlKey) {
      inputRef?.current?.focus();
    }
  });
  return (
    <div className="search-wrapper">
      <form onSubmit={onEnterPress}>
      <input
        className="search-input"
        value={searchText}
        ref={inputRef}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search Places..."
      />
      <div className="shortcut-wrapper">
        <p>Ctrl + /</p>
        </div>
        </form>
    </div>
  );
};

export default SearchBox;
