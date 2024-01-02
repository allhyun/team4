import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../styles/style.scss';
import { BsImage } from 'react-icons/bs'; // 이미지 아이콘
import MarketCategory from './MarketCategory';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SassColor } from 'sass';

// 데이터 타입
interface DataType {
  u_idx: number; // 유저 아이디
  buy_idx: number; // 판매 상태 : 0-판매중,1-예약중, 2-판매완료, 3-판매 보류
  ud_price: number | null; // 가격
  ud_title: string; // 상품명
  ud_category: string; // 카테고리
  ud_image: string | null; // 상품사진
  ud_content: string; // 상품설명
  ud_region: string; // 거래지역
  viewcount: number; // 조회수
  ud_date: string; // 작성시간
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
    u_idx: 1,
    buy_idx: 1,
    ud_price: null,
    ud_title: '',
    ud_category: '',
    ud_image: '../../public/img/jordy.gif',
    ud_content: '',
    ud_region: '',
    viewcount: 0,
    ud_date: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataType({ ...DataType, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    setDataType({ ...DataType, ud_category: category });
  };

  // 데이터 서버에 전송 ------------------------------------------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // 이미지가 있으면 첫 번째 이미지를 사용, 없으면 기본 이미지 URL을 사용
    const imageData = images.length > 0 ? images[0] : DataType.ud_image;

    // 이미지가 실제 파일 객체인 경우에만 formData에 추가
    if (imageData instanceof File) {
      formData.append('images', imageData);
    } else if (imageData) {
      // imageData가 null이 아닌 경우에만 실행
      formData.append('ud_image', imageData);
    }

    const data = {
      u_idx: DataType.u_idx,
      buy_idx: DataType.buy_idx,
      ud_price: DataType.ud_price,
      ud_title: DataType.ud_title,
      ud_category: DataType.ud_category,
      ud_image: DataType.ud_image, // 이미지 처리 방식 확인 필요
      ud_content: DataType.ud_content,
      ud_region: DataType.ud_region,
      viewcount: DataType.viewcount,
      ud_date: new Date().toISOString(), // 현재 시간 설정
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/product/regist',
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('데이터 잘 보내지는지?:', response.data);
      navigate('/market');
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
    setDataType({ ...DataType, ud_title: newTitle });
  };

  // 설명창 관련 ------------------------------------------------------------------------------------------

  // 설명창 이벤트핸들러
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setTextareaLength(newDescription.length); // 설명 길이 업데이트
    setDataType({ ...DataType, ud_content: newDescription });
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
    setDataType({ ...DataType, ud_price: limitedValue }); // 1억 이하로 제한
    setFormattedPrice(
      limitedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    ); // 숫자만 가능
  };

  // 거래지역 관련 ------------------------------------------------------------------------------------------

  const handleRegionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataType({ ...DataType, ud_region: e.target.value });
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
              value={DataType.ud_title}
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
            <input
              value={DataType.ud_region}
              type="text"
              id="market-region"
              name="region"
              onChange={handleRegionChange}
            />
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
              value={DataType.ud_content}
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
