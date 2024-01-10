import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MarketHeader from './MarketHeader';
// 리덕스 관련
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setModifyPost } from '../../store/marketmodifyReducer';
//
import { MdCancel } from 'react-icons/md';
import { BsImage } from 'react-icons/bs';
import MarketCategory from './MarketCategory';
import MarketRegion from './MarketRegion';
import { ErrorMessages, DataType, CategoryMap } from '../Types/MarketType';

const MarketModify: React.FC = () => {
  const [data, setData] = useState<DataType>({
    ud_idx: 1,
    u_idx: 0,
    buy_idx: 0,
    ud_price: 0,
    ud_title: '',
    ud_image: '',
    ud_content: '',
    ud_region: '',
    viewcount: 0,
    ud_date: '',
    nickname: '',
    c_idx: null,
  });

  const params = useParams();

  // 리덕스에서 유저 정보 갖고오기!
  const userInfo = useSelector((state: any) => state.user.user);
  //   const { u_idx, nickname } = userInfo;
  const dispatch = useDispatch();
  // const { ud_idx } = useParams(); // URL에서 게시글 ID를 가져오기!

  // console.log('Converted to number:', udIdxNumber); // 변환된 숫자 확인

  //  리덕스에서 modifyPostdp 정보 갖고오기!
  const modifyPost = useSelector(
    (state: any) => state.market.market.modifyPost
  );
  // console.log('modifyPost.ud_idx:', modifyPost.ud_idx);
  // console.log('modifyPost값 확인 :', modifyPost);

  // const ud_idx = modifyPost ? modifyPost.ud_idx : null;
  // const ud_idx = params.ud_idx; // URL에서 게시글 ID를 가져오기!

  // 카테고리 문자열을 숫자 ID로 매핑
  const getCategoryID = (categoryName: string): number | null => {
    const categoryMap: CategoryMap = {
      도서: 1,
      전자기기: 2,
      문구: 3,
      '티켓/쿠폰': 4,
      생활: 5,
      취미: 6,
      무료나눔: 7,
      기타: 8,
    };
    // 카테고리 이름이 없으면 null 반환
    return categoryMap[categoryName] || null;
  };

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
    ud_region: '',
    ud_content: '',
    ud_image: '',
    c_idx_error: null,
  });

  // 포커싱용 참조 생성
  const titleRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLLabelElement>(null);

  // 카테고리 컨테이너에 대한 참조 생성
  const marketCategoryRef = useRef<HTMLDivElement>(null);

  // MarketRegion 컴포넌트로부터 지역값 변경을 처리
  const handleRegionChange = (newRegion: string) => {
    setData({ ...data, ud_region: newRegion });
  };

  // 수정 관련 ------------------------------------------------------------------------------------------
  // 수정할 데이터를 로컬 상태로 설정
  useEffect(() => {
    if (modifyPost) {
      setData(modifyPost);
      // 타이틀 길이를 이전 데이터의 길이로 설정합니다.
      setTitleLength(modifyPost.ud_title.length);
      // 설명 길이를 이전 데이터의 길이로 설정합니다.
      setTextareaLength(modifyPost.ud_content.length);
      // 미리보기 이미지 배열의 길이를 이전 데이터의 이미지 수로 설정합니다.
      setImageLength(
        modifyPost.ud_image ? JSON.parse(modifyPost.ud_image).length : 0
      );
      // 가격 값을 기반으로 포맷된 가격을 초기화합니다.
      setFormattedPrice(
        modifyPost.ud_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );

      console.log('현재 스토어의 상태:', modifyPost);

      // 이미지 URL 설정
      if (modifyPost.ud_image) {
        try {
          // JSON 문자열을 배열로 파싱
          const imageUrls = JSON.parse(modifyPost.ud_image);
          setPreviewUrls(
            imageUrls.map(
              (ud_image: string) =>
                // `http://localhost:8000/static/userImg/${encodeURIComponent(ud_image)}`
                // 배포용
                `${
                  process.env.REACT_APP_HOST
                }/static/userImg/${encodeURIComponent(ud_image)}`
            )
          );
        } catch (error) {
          console.error('이미지 URL 파싱 오류:', error);
          // JSON 파싱 실패 시, 단일 URL로 처리
          setPreviewUrls([
            // `http://localhost:8000/${encodeURIComponent(editingPost.ud_image)}`,
            // 배포용
            `${process.env.REACT_APP_HOST}/${encodeURIComponent(
              modifyPost.ud_image
            )}`,
          ]);
        }
      }
    }
  }, [modifyPost]);

  // 이미지창 관련 ------------------------------------------------------------------------------------------

  // 1. 이미지 5개까지만 제한
  // 2. 이미지 등록 버튼 오른쪽에 미리보기 사진들 -> 사진 위에 x자 버튼 생성 후 x버튼 누르면 삭제되게 구현
  // 3. 이미지 등록 박스에 올린 이미지 갯수 업데이트(삭제된 이미지갯수도 반영 필요)
  // 4. 이미지 확장자 image/tiff, image/png, image/jpg, image/jpeg, image/png, image/gif 만 가능하게 설정.

  // 이미지 선택 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // 새로 선택된 파일들을 기존의 파일 배열에 추가
      const newFiles = Array.from(e.target.files);
      const totalFiles = images.length + newFiles.length;

      // 파일 크기 검사(5mb)
      const fileExceedsSize = newFiles.some(
        (file: File) => file.size > 5 * 1024 * 1024
      );
      if (fileExceedsSize) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          ud_image: '파일 크기는 5MB를 초과할 수 없습니다.',
        }));
        return;
      }

      // 파일 수 검사 (5개 제한)
      if (totalFiles > 5) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          ud_image: '사진은 최대 5장까지만 가능합니다.',
        }));
        return;
      } else {
        setErrorMessages((prevErrors) => ({ ...prevErrors, ud_image: '' }));
      }

      setImages((prevImages) => [...prevImages, ...newFiles]);

      // 이미지 수 업데이트
      setImageLength(totalFiles);

      // 미리보기 URL 생성
      const newPreviewUrls = newFiles.map((file: File) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    }
  };

  // 이미지 미리보기 영역
  const renderImagePreviews = () => {
    if (previewUrls.length === 0) {
      return null; // 이미지가 없을 경우 아무것도 렌더링하지 않음
    }

    return previewUrls.map((url, index) => (
      <div key={index} className="image-container">
        <li key={index} className="image-preview">
          {/* 첫 번째 이미지에만 '대표사진' 표시 */}
          {index === 0 && <div className="primary-photo-label">대표사진</div>}
          <img src={url} alt={`preview-${index}`} />
          <button onClick={() => removeImage(index)}>
            <MdCancel />
          </button>
        </li>
      </div>
    ));
  };

  // 이미지 제거 핸들러 (옵션)
  const removeImage = (index: number) => {
    // 이미지 배열에서 해당 인덱스의 이미지 제거
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    // 미리보기 URL 배열에서도 해당 인덱스의 URL 제거
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));

    // 이미지 수 업데이트
    setImageLength((prevLength) => prevLength - 1);
  };

  // 이미지 포커싱 : 라벨에 포커싱
  const imageUploadLabel = document.querySelector(
    'label[htmlFor="market-img"]'
  ) as HTMLLabelElement | null;
  if (imageUploadLabel) {
    imageUploadLabel.focus();
  }

  // 공통 입력 변경 핸들러 ------------------------------------------------------------------------------------------
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setData((prevData) => ({ ...prevData, [name]: value }));

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

    // console.log('변경 후 예상되는 데이터 상태:', { ...data, [name]: value });
  };

  // 카테고리 제출 핸들러
  const handleCategoryChange = (categoryName: string) => {
    const categoryID = getCategoryID(categoryName);
    setData({ ...data, c_idx: categoryID });

    // 카테고리 선택 시 관련 오류 메시지 제거
    if (errorMessages.c_idx_error) {
      setErrorMessages({ ...errorMessages, c_idx_error: null });
    }
  };

  // 유효성 검사 함수 ------------------------------------------------------------------------------------------
  const validateFields = (): boolean => {
    let isValid = true;

    // 이미지 유효성 검사
    // if (images.length === 0) {
    //   setErrorMessages((prev) => ({
    //     ...prev,
    //     ud_image: '이미지를 넣어주세요.',
    //   }));
    //   imageRef.current?.focus();
    //   return false;
    // } else {
    //   setErrorMessages((prev) => ({
    //     ...prev,
    //     ud_image: '', // 이미지가 있을 경우 메시지를 초기화
    //   }));
    // }

    // 상품명 유효성 검사
    if (!data.ud_title) {
      setErrorMessages((prev) => ({
        ...prev,
        ud_title: '상품명을 입력해주세요.',
      }));
      titleRef.current?.focus();
      return false;
    }

    // 카테고리 유효성 검사
    if (!data.c_idx) {
      setErrorMessages((prev) => ({
        ...prev,
        c_idx_error: '카테고리를 선택해주세요.',
      }));
      marketCategoryRef.current?.focus();
      return false;
    }

    // 거래지역 유효성 검사
    if (!data.ud_region) {
      setErrorMessages((prev) => ({
        ...prev,
        ud_region: '거래지역을 입력해주세요.',
      }));
      regionRef.current?.focus();
      return false;
    }

    // 가격 유효성 검사
    if (!data.ud_price || data.ud_price === 0) {
      setErrorMessages((prev) => ({
        ...prev,
        ud_price: '가격을 입력해주세요.',
      }));
      priceRef.current?.focus();
      return false;
    }

    // 상품 설명 유효성 검사
    if (!data.ud_content) {
      setErrorMessages((prev) => ({
        ...prev,
        ud_content: '설명을 입력해주세요.',
      }));
      contentRef.current?.focus();
      return false;
    }

    return isValid;
  };

  // 데이터 서버에 전송 ------------------------------------------------------------------------------------------
  const handleModify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;
    // ud_idx 값 로깅
    console.log('ud_idx:', modifyPost.ud_idx);

    console.log('data:', data);
    const formData = new FormData();
    images.forEach((image) => formData.append('ud_image', image));
    formData.append('ud_title', data.ud_title);
    formData.append('ud_category', data.c_idx?.toString() ?? '');
    formData.append('ud_region', data.ud_region);
    formData.append('ud_price', data.ud_price?.toString() ?? '');
    formData.append('ud_content', data.ud_content);

    try {
      const res = await axios.put(
        // `http://localhost:8000/product/detail/${udIdxNumber}}`,
        // 배포용
        `${process.env.REACT_APP_HOST}/product/detail/${modifyPost.ud_idx}`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      navigate('/market');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // 원본
  // try {
  //   const res = await axios.put(
  //     // `http://localhost:8000/product/detail/${udIdxNumber}}`,
  //     // 배포용
  //     `${process.env.REACT_APP_HOST}/product/detail/${modifyPost.ud_idx}`,
  //     formData,
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   );

  //   console.log('수정 axios put서버 응답:', res.data);

  //   // 여기서 res.data의 구조를 확인하고 Redux 스토어 업데이트
  //   console.log('여기서 res.data 확인:', res.data);
  //   if (res.data.updatedusedGoods) {
  //     console.log(
  //       '수정 성공 데이터res.data.updatedusedGoods[0]:',
  //       res.data.updatedusedGoods[0]
  //     );
  //     dispatch(setModifyPost(res.data.updatedusedGoods[0]));
  //     navigate('/market');
  //   } else {
  //     // 예상치 못한 응답 처리
  //     console.error('예상치 못한 응답:', res.data);
  //   }
  // } catch (error) {
  //   console.error('수정 중 오류 발생:', error);
  //   alert('수정 중 문제가 발생했습니다.');
  // }
  // };

  return (
    <>
      <MarketHeader />
      <div className="center">
        <div id="marketcontainer" className="market_container">
          <div id="marketeditor" className="market_editor">
            <form onSubmit={handleModify}>
              <section className="market-img">
                상품이미지
                <span style={{ color: '#fcbaba' }}>＊</span>
                <div className="img_container">
                  <label htmlFor="market-img" ref={imageRef} tabIndex={0}>
                    <div className="market-img">
                      <BsImage />
                      <div>이미지등록 </div>
                      <div className="img-length">{imageLength}/5</div>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="market-img"
                    name="ud_image"
                    accept="image/tiff, image/png, image/jpg, image/jpeg, image/png, image/gif"
                    onChange={handleFileChange}
                  />

                  <ul className="image-previews-list">
                    {renderImagePreviews()}
                  </ul>
                </div>
                {errorMessages.ud_image && (
                  <p className="error-message">{errorMessages.ud_image}</p>
                )}
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
                {errorMessages.c_idx_error && (
                  <p className="error-message">{errorMessages.c_idx_error}</p>
                )}
              </section>
              <section className="market-region">
                거래지역<span style={{ color: '#fcbaba' }}>＊</span>
                <div className="region_container">
                  <MarketRegion
                    value={data.ud_region}
                    onChange={handleRegionChange}
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
                      <p className="error-message">
                        {errorMessages.ud_content}
                      </p>
                    )}
                    {textareaLength}/1000
                  </div>
                </div>
              </section>
              <button className="marketeditor-regi" type="submit">
                수정
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketModify;
