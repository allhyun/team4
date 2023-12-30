import React, { useState, ChangeEvent, FormEvent } from 'react';

// 각 페이지에 들어갈 내용이 다르면 prop으로 전달.
interface SearchProps {
  placeholder: string; //
  onSearch: (searchTerm: string) => void; // 검색 로직 처리
}

export default function Search() {
  return (
    <div id="search">
      <div className="search_inner">
        <label htmlFor="searchInput">
          <span className="ir">검색</span>
        </label>
        <input
          type="search"
          id="searchInput"
          autoComplete="off"
          className="search_input"
        />
      </div>
    </div>
  );
}
