import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import '../../styles/style.scss';
import { BsImage } from 'react-icons/bs'; // 이미지 아이콘
import MarketCategory from './MarketCategory';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
// 에러 메시지 타입 정의
interface ErrorMessages {
  ud_title: string;
  ud_price: string;
  ud_category: string;
  ud_region: string;
  ud_content: string;
  ud_image: string;
}

const MarketEditor: React.FC = () => {
  // 데이터 초기값
  const [data, setData] = useState<DataType>({
    u_idx: 1,
    buy_idx: 1,
    ud_price: null,
    ud_title: '',
    ud_category: '',
    ud_image: '',
    ud_content: '',
    ud_region: '',
    viewcount: 0,
    ud_date: '',
  });

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
  // 에러 메시지
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    ud_title: '',
    ud_price: '',
    ud_category: '',
    ud_region: '',
    ud_content: '',
    ud_image: '',
  });

  // 포커싱용 참조 생성
  const titleRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // 카테고리 컨테이너에 대한 참조 생성
  const marketCategoryRef = useRef<HTMLDivElement>(null);

  // 이미지창 관련 ------------------------------------------------------------------------------------------

  // 1. 이미지 5개까지만 제한
  // 2. 이미지 등록 버튼 오른쪽에 미리보기 사진들 -> 사진 위에 x자 버튼 생성 후 x버튼 누르면 삭제되게 구현
  // 3. 이미지 등록 박스에 올린 이미지 갯수 업데이트(삭제된 이미지갯수도 반영 필요)

  // 파일 선택 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([e.target.files[0]]);
    }
  };

  // 공통 입력 변경 핸들러 ------------------------------------------------------------------------------------------
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // 상품명창 관련
    if (name === 'ud_title') {
      const newTitle = e.target.value;
      setTitleLength(newTitle.length); // 타이틀 길이 업데이트
      setData({ ...data, ud_title: newTitle });
    }

    // 설명창 관련
    if (name === 'ud_content') {
      const newDescription = e.target.value;
      setTextareaLength(newDescription.length); // 설명 길이 업데이트
      setData({ ...data, ud_content: newDescription });
    }

    // 가격창 관련
    if (name === 'ud_price') {
      // 숫자만 허용
      const numbersOnly = value.replace(/[^0-9]/g, '');
      // 숫자를 number 타입으로 변환, 1억 이하로 제한
      const limitedValue = Math.min(Number(numbersOnly), 100000000);
      setData({ ...data, [name]: limitedValue });
      // 숫자를 문자열로 변환하고, 정규식을 사용하여 3자리마다 쉼표 추가
      setFormattedPrice(
        limitedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
    } else {
      // 기타 일반 텍스트 필드
      setData({ ...data, [name]: value });
    }
    // 오류 메시지 업데이트 로직 - 입력이 시작되면 해당 필드의 오류 메시지를 제거
    if (Object.keys(errorMessages).includes(name)) {
      setErrorMessages({ ...errorMessages, [name]: '' });
    }

    console.log('변경 후 예상되는 데이터 상태:', { ...data, [name]: value });
  };

  // 카테고리 제출 핸들러
  const handleCategoryChange = (category: string) => {
    setData({ ...data, ud_category: category });

    // 카테고리 선택 시 관련 오류 메시지 제거
    if (errorMessages.ud_category) {
      setErrorMessages({ ...errorMessages, ud_category: '' });
    }
  };

  // 유효성 검사 함수 ------------------------------------------------------------------------------------------
  const validateFields = (): boolean => {
    let isValid = true;
    let errors = {
      ud_title: '',
      ud_price: '',
      ud_category: '',
      ud_region: '',
      ud_content: '',
      ud_image: '',
    };

    if (!data.ud_title) {
      errors.ud_title = '상품명을 입력해주세요.';
      titleRef.current?.focus();
      isValid = false;
    } else if (!data.ud_category) {
      errors.ud_category = '카테고리를 선택해주세요.';
      marketCategoryRef.current?.focus();
      isValid = false;
    } else if (!data.ud_region) {
      errors.ud_region = '거래지역을 입력해주세요.';
      regionRef.current?.focus();
      isValid = false;
    } else if (!data.ud_price || data.ud_price === 0) {
      errors.ud_price = '가격을 입력해주세요.';
      priceRef.current?.focus();
      isValid = false;
    } else if (!data.ud_content) {
      errors.ud_content = '설명을 입력해주세요.';
      contentRef.current?.focus();
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  // 데이터 서버에 전송 ------------------------------------------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('제출 전 데이터 상태:', data);
    if (!validateFields()) {
      return; // 유효성 검사 실패 시 제출 중단
    }

    const formData = new FormData();
    // 이미지 추가 (있는 경우에만)
    if (images.length > 0) {
      formData.append('ud_image', images[0]);
    } else {
      // 기본 이미지 경로를 서버가 처리할 수 있는 방식으로 추가 (예: URL 혹은 서버에 저장된 파일 이름)
      formData.append('ud_image', '../../public/img/jordy.gif'); // 예시, 실제 경로로 변경 필요
    }
    formData.append('u_idx', data.u_idx.toString());
    formData.append('buy_idx', data.buy_idx.toString());
    formData.append('ud_price', data.ud_price?.toString() ?? '');
    formData.append('ud_title', data.ud_title);
    formData.append('ud_category', data.ud_category);
    formData.append('ud_content', data.ud_content);
    formData.append('ud_region', data.ud_region);
    formData.append('viewcount', data.viewcount.toString());
    formData.append('ud_date', new Date().toISOString()); // 현재 시간 설정
    // FormData 로깅
    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/product/regist',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log('데이터 잘 보내지는지?:', response.data);
      navigate('/market');
    } catch (error) {
      console.error('게시글 등록 에러:', error);
    }
    console.log('FormData 객체의 상태 출력:', formData);
  };

  return (
    <div id="marketeditor" className="market_editor">
      <form onSubmit={handleSubmit}>
        <section className="market-img">
          상품이미지
          <span style={{ color: '#fcbaba' }}>＊</span>
          <div className="img_container">
            <input
              type="file"
              id="market-img"
              name="ud_image"
              onChange={handleFileChange}
            />
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
              name="ud_title"
              maxLength={40}
              ref={titleRef}
              value={data.ud_title}
              onChange={handleInputChange}
            />
            <span className="title-length">{titleLength}/40</span>
            {errorMessages.ud_title && (
              <p className="error-message">{errorMessages.ud_title}</p>
            )}
          </div>
        </section>
        <section className="market-category">
          <div
            className="market-category"
            ref={marketCategoryRef}
            tabIndex={-1}
          >
            카테고리<span style={{ color: '#fcbaba' }}>＊</span>
            <MarketCategory onSelectCategory={handleCategoryChange} />
          </div>
          {errorMessages.ud_category && (
            <p className="error-message">{errorMessages.ud_category}</p>
          )}
        </section>
        <section className="market-region">
          거래지역<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="region_container">
            <input
              value={data.ud_region}
              type="text"
              id="market-region"
              ref={regionRef}
              name="ud_region"
              onChange={handleInputChange}
            />
            {errorMessages.ud_region && (
              <p className="error-message">{errorMessages.ud_region}</p>
            )}
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
                name="ud_price"
                ref={priceRef}
                value={formattedPrice}
                onChange={handleInputChange}
              />
            </label>
            {errorMessages.ud_price && (
              <p className="error-message">{errorMessages.ud_price}</p>
            )}
          </div>
        </section>
        <section className="market-textarea">
          설명<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="textarea_container">
            <textarea
              id="market-textarea"
              name="ud_content"
              maxLength={1000}
              ref={contentRef}
              value={data.ud_content}
              onChange={handleInputChange}
            />

            <div className="textarea-length">
              {errorMessages.ud_content && (
                <p className="error-message">{errorMessages.ud_content}</p>
              )}
              {textareaLength}/1000
            </div>
          </div>
        </section>
        <button
          className="marketeditor-regi"
          type="submit"
          onClick={handleSubmit}
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default MarketEditor;
