import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../styles/style.scss';
import { ImSearch } from 'react-icons/im'; //돋보기 아이콘

// 각 페이지에 들어갈 내용이 다르면 prop으로 전달.
interface SearchProps {
  placeholder: string; //
  onSearch: (searchTerm: string) => void; // 검색 로직 처리
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch }) => {
  const [seacrhword, setSeacrhWord] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSeacrhWord(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색 로직 수행
    console.log('search 컴포넌트 검색어:', seacrhword);
    onSearch(seacrhword);
  };
  return (
    <div id="search">
      <form className="search_inner" onSubmit={handleSearch}>
        <label htmlFor="searchInput">
          <ImSearch />
        </label>

        <input
          type="search"
          id="searchInput"
          placeholder={placeholder}
          autoComplete="off"
          className="search_input"
          value={seacrhword}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default Search;
