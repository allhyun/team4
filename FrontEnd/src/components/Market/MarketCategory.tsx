import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';

const MarketCategory = ({
  onSelectCategory,
}: {
  onSelectCategory: (category: string) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  // 카테고리 이벤트핸들러
  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category); // 부모 컴포넌트로 선택된 카테고리 전달

    try {
      const response = await axios.post(
        'http://localhost:8000/product/regist',
        {
          category: category,
        }
      );

      console.log('서버 응답:', response.data);
      //성공시 해당 카테고리 검색 페이지로 리다이렉트
      //  navigate("/");
    } catch (error) {
      console.error('카테고리 전송 에러:', error);
    }
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
