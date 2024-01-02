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

// 데이터 타입
interface DataType {
  category: string;
  location: string;
  title: string;
  price: number | null;
  description: string;
  image: File | null;
  textarea: string;
}

const MarketEditor: React.FC = () => {
  // 이미지
  const [images, setImages] = useState<File[]>([]);
  // 이미지 미리보기
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // 글자수
  const [titleLength, setTitleLength] = useState(0);
  const [textareaLength, setTextareaLength] = useState(0);
  // 이미지수
  const [imageLength, setImageLength] = useState(0);
  // 리다이렉트용
  const navigate = useNavigate();
  // 가격 형식
  const [formattedPrice, setFormattedPrice] = useState('');

  // 데이터 초기값
  const [DataType, setDataType] = useState<DataType>({
    category: '',
    location: '',
    title: '',
    price: null,
    description: '',
    image: null,
    textarea: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataType({ ...DataType, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    setDataType({ ...DataType, category });
  };

  // 데이터 서버에 전송
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));
    formData.append('category', DataType.category);
    formData.append('location', DataType.location);
    formData.append('title', DataType.title);
    formData.append('price', DataType.price.toString());
    formData.append('description', DataType.textarea);

    try {
      const response = await axios.post(
        'http://localhost:8000/product/regist',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(response.data);
      navigate('/marketmain'); // 또는 성공 시 다른 경로로 리다이렉트
    } catch (error) {
      console.error('게시글 등록 에러:', error);
    }
  };

  // 이미지창 관련 ------------------------------------------------------------------------------------------

  // 이미지 등록 이벤트핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files).slice(0, 5); // 갯수제한 5개
      setImages(selectedImages);

      const newPreviewUrls = selectedImages.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls(newPreviewUrls);
      setImageLength(selectedImages.length); // 이미지 갯수 업데이트
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newPreviewUrls);
    setImageLength(newImages.length); // 삭제된 이미지 갯수 반영
  };

  // 이미지 미리보기 및 삭제 버튼
  const renderImagePreviews = () => (
    <div>
      {previewUrls.map((url, index) => (
        <div key={url}>
          <img src={url} alt={`preview-${index}`} />
          <button type="button" onClick={() => removeImage(index)}>
            X
          </button>
        </div>
      ))}
    </div>
  );

  // 상품명창 관련 ------------------------------------------------------------------------------------------

  // 상품명창 이벤트핸들러
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitleLength(newTitle.length); // 타이틀 길이 업데이트
    setDataType({ ...DataType, title: newTitle });
  };

  // 설명창 관련 ------------------------------------------------------------------------------------------

  // 설명창 이벤트핸들러
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setTextareaLength(newDescription.length); // 설명 길이 업데이트
    setDataType({ ...DataType, textarea: newDescription });
  };

  // 가격창 관련 ------------------------------------------------------------------------------------------

  const onlyNumber = (value: string) => {
    // 숫자만 허용
    const numbersOnly = value.replace(/[^0-9]/g, '');
    // 숫자를 Number 타입으로 변환하고, 1억 이하의 값으로 제한
    const limitedValue = Math.min(Number(numbersOnly), 100000000);
    // 숫자를 문자열로 변환하고, 정규식을 사용하여 3자리마다 쉼표 추가
    return limitedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 가격창 입력 핸들러
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
    const limitedValue = Math.min(Number(numbersOnly), 100000000);
    setDataType({ ...DataType, price: limitedValue }); // 1억 이하로 제한
    setFormattedPrice(
      limitedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    ); // 숫자만 가능
  };

  return (
    <div id="marketeditor" className="market_editor">
      <form onSubmit={handleSubmit}>
        <section className="market-img">
          상품이미지
          <span style={{ color: '#fcbaba' }}>＊</span>
          <div className="img_container">
            <input type="file" id="market-img" name="img" />
            <label htmlFor="market-img">
              <div className="market-img">
                <BsImage />
                <div>이미지등록 </div>
                <div className="img-length">{imageLength}/5</div>
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
              name="title"
              maxLength={40}
              onChange={handleTitleChange}
            />
            <span className="title-length">{titleLength}/40</span>
          </div>
        </section>
        <section className="market-category">
          <div className="market-category">
            카테고리<span style={{ color: '#fcbaba' }}>＊</span>
            <MarketCategory onSelectCategory={handleCategoryChange} />
          </div>
        </section>
        <section className="market-region">
          거래지역<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="region_container">
            <input type="text" id="market-region" name="region" />
          </div>
        </section>
        <section className="market-price">
          가격<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="price_container">
            <label htmlFor="market-price">
              <span>₩</span>
              <input
                type="text"
                id="market-price"
                name="price"
                value={formattedPrice}
                onChange={handlePriceChange}
              />
            </label>
          </div>
        </section>
        <section className="market-textarea">
          설명<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="textarea_container">
            <textarea
              id="market-textarea"
              name="textarea"
              maxLength={1000}
              onChange={handleTextareaChange}
            />
            <div className="textarea-length">{textareaLength}/1000</div>
          </div>
        </section>
        <button className="marketeditor-regi" type="submit">
          등록
        </button>
      </form>
    </div>
  );
};

export default MarketEditor;
