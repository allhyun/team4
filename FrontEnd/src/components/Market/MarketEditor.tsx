import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
import '../../styles/style.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SassColor } from 'sass';

interface DataType {
  category: string;
  location: string;
  title: string;
  price: number | null;
  description: string;
  image: File | null;
}

const MarketEditor: React.FC = () => {
  const [DataType, setDataType] = useState<DataType>({
    category: '',
    location: '',
    title: '',
    price: null,
    description: '',
    image: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataType({ ...DataType, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDataType({ ...DataType, image: e.target.files[0] });
    }
  };

  const handleCategoryChange = (category: string) => {
    setDataType({ ...DataType, category });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(DataType);
    // 여기에 게시글 제출 로직 추가
  };

  return (
    <div id="marketeditor" className="market_editor">
      <form>
        <div>
          <label htmlFor="market-img">
            상품이미지<span style={{ color: '#fcbaba' }}>＊</span>
            <input type="file" id="market-img" name="market-img" />
          </label>
        </div>
        <div>
          <label htmlFor="market-category">
            카테고리<span style={{ color: '#fcbaba' }}>＊</span>
            <div>
              <ul className="category_list">
                <li>도서/음반/문구</li>
                <li>모바일/태블릿</li>
                <li>카메라/캠코더</li>
                <li>노트북/PC</li>
                <li>게임</li>
                <li>티켓/쿠폰</li>
                <li>가전제품</li>
                <li>스포츠</li>
                <li>레저/여행</li>
                <li>패션의류</li>
                <li>패션잡화</li>
                <li>뷰티</li>
                <li>가구/인테리어</li>
                <li>리빙/생활</li>
                <li>출산/유아동</li>
                <li>반려동물/취미</li>
                <li>무료나눔</li>
              </ul>
            </div>
            <div>
              <ul className="category_list">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div>
              <ul className="category_list">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <input type="text" id="market-category" name="market-category" />
          </label>
        </div>
        <div>
          <label htmlFor="market-region">
            거래지역<span style={{ color: '#fcbaba' }}>＊</span>
            <input type="text" id="market-region" name="market-region" />
          </label>
        </div>
        <div>
          <label htmlFor="market-title">
            상품명<span style={{ color: '#fcbaba' }}>＊</span>
            <input type="text" id="market-title" name="market-title" />
          </label>
        </div>
        <div>
          <label htmlFor="market-price">
            가격<span style={{ color: '#fcbaba' }}>＊</span>
            <input type="text" id="market-price" name="market-price" />
          </label>
        </div>
        <div>
          <label htmlFor="market-textarea">
            설명<span style={{ color: '#fcbaba' }}>＊</span>
            <textarea id="market-textarea" name="market-textarea" />
          </label>
        </div>
        <button>취소</button>
        <button>등록</button>
      </form>
    </div>
  );
};

export default MarketEditor;
