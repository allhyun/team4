import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
import '../../styles/style.scss';
import { BsImage } from 'react-icons/bs'; // 이미지 아이콘
import MarketCategory from './MarketCategory';
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
  const navigate = useNavigate();
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

  const handleCancel = () => {
    navigate('/market');
  };

  return (
    <div id="marketeditor" className="market_editor">
      <form onSubmit={handleSubmit}>
        <section className="market-img">
          상품이미지
          <span style={{ color: '#fcbaba' }}>＊</span>
          <div className="img_container">
            <input type="file" id="market-img" name="market-img" />
            <label htmlFor="market-img">
              <div className="market-img">
                <BsImage />
                <div>이미지등록</div>
              </div>
            </label>
          </div>
        </section>
        <section className="market-title">
          상품명<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="text_container">
            <input
              type="text"
              id="market-title"
              name="market-title"
              maxLength={40}
            />
            <span className="length">0/40</span>
          </div>
        </section>
        <section className="market-category">
          <div className="market-category">
            카테고리<span style={{ color: '#fcbaba' }}>＊</span>
            <MarketCategory />
          </div>
        </section>
        <section className="market-region">
          거래지역<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="region_container">
            <input type="text" id="market-region" name="market-region" />
          </div>
        </section>
        <section className="market-price">
          가격<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="price_container">
            <label htmlFor="market-price">
              <span>₩</span>
              <input type="text" id="market-price" name="market-price" />
            </label>
          </div>
        </section>
        <section className="market-textarea">
          설명<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="textarea_container">
            <textarea
              id="market-textarea"
              name="market-textarea"
              maxLength={1000}
            />
          </div>
        </section>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default MarketEditor;
