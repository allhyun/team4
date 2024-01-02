import React, { useState } from 'react';

const MarketCategory = ({
  onSelectCategory,
}: {
  onSelectCategory: (category: string) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카테고리 클릭 이벤트 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category); // 선택된 카테고리 상태 업데이트
    onSelectCategory(category); // 부모 컴포넌트에 선택된 카테고리 전달
  };

  const categories = [
    '도서',
    '전자기기',
    '문구',
    '티켓/쿠폰',
    '생활',
    '취미',
    '무료나눔',
    '기타',
  ];

  return (
    <div className="category_container">
      <ul className="category_list">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? 'selected' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketCategory;
