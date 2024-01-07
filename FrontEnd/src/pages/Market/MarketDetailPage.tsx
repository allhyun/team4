import MarketHeader from '../../components/Market/MarketHeader';
import '../../styles/style.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
//리덕스 관련
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
//
import '../../styles/style.scss';
import { IoEyeSharp } from 'react-icons/io5'; // 조회수 아이콘
import { PiHeartFill } from 'react-icons/pi'; // 좋아요 아이콘
import { MdOutlineAccessTimeFilled } from 'react-icons/md'; // 시간 아이콘
import { IoIosArrowDropleftCircle } from 'react-icons/io'; // 왼쪽 아이콘
import { IoIosArrowDroprightCircle } from 'react-icons/io'; // 오른쪽 아이콘
import { PiChatTextBold } from 'react-icons/pi'; // 채팅 아이콘

interface DetailDataType {
  ud_idx: number; // 게시판 포린키
  u_idx: number; // 유저 아이디
  buy_idx: number; // 판매 상태 : 0-판매중,1-예약중, 2-판매완료, 3-판매 보류
  ud_price: number | null; // 가격
  ud_title: string; // 상품명
  ud_category: number | null; // 카테고리
  ud_image: string | null; // 상품사진
  ud_content: string; // 상품설명
  ud_region: string; // 거래지역
  viewcount: number; // 조회수
  ud_date: string; // 작성시간
  nickname: string; // 사용자 닉네임
  ud_images?: string[]; // 이미지 배열
}
// // 카테고리 문자 변환 함수 타입 정의
// interface CategoryMap {
//   [key: string]: string;
// }

// // 카테고리 숫자 ID를 문자열로 매핑
// const getCategoryID = (categoryName: string): number | null => {
//   const categoryMap: CategoryMap = {
//     1: '도서',
//     2: '전자기기',
//     3: '문구',
//     4: '티켓/쿠폰',
//     5: '생활',
//     6: '취미',
//     7: '무료나눔',
//     8: '기타',
//   };
//   // 카테고리 이름이 없으면 null 반환
//   return categoryMap[categoryName] || null;
// };

const MarketDetailPage = () => {
  const navigate = useNavigate();
  const { ud_idx } = useParams();
  const [marketDetail, setMarketDetail] = useState<DetailDataType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/detail/${ud_idx}`)
      .then((response) => {
        // console.log('서버 응답 데이터:', response.data);
        const productData = response.data;

        // ud_image 필드가 JSON 문자열인 경우 배열로 변환
        if (productData.ud_image && typeof productData.ud_image === 'string') {
          productData.ud_images = JSON.parse(productData.ud_image);
        } else {
          productData.ud_images = []; // 또는 기본값 설정
        }

        setMarketDetail(response.data);
      })
      .catch((error) => console.error(error));
  }, [ud_idx]);

  // 가격 변환 함수
  const formatPrice = (price: number | null): string => {
    if (price === null) return '가격 미정';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (!marketDetail) {
    return <div>Loading...</div>;
  }

  // 날짜 변환 함수
  const timeSince = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const timeDiff = now.getTime() - postDate.getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `${seconds}초 전`;
    }
  };

  // 이미지 관련 함수

  // 이미지 다음 이미지로 이동
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  // 이미지 이전 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      marketDetail &&
      marketDetail.ud_images &&
      prevIndex < marketDetail.ud_images.length - 1
        ? prevIndex + 1
        : prevIndex
    );
  };

  // 인디케이터
  const renderIndicators = () => {
    return (
      marketDetail &&
      marketDetail.ud_images &&
      marketDetail.ud_images.map((_, index) => (
        <span
          key={index}
          className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
          onClick={() => setCurrentImageIndex(index)}
        ></span>
      ))
    );
  };

  // 삭제 기능
  const handleDelete = async () => {
    // 사용자에게 삭제 확인 -> 발표할 땐 주석하고 실제 운용할땐 쓰는게 좋을듯!
    // const confirmDelete = window.confirm('이 게시글을 정말 삭제하시겠습니까?');
    // if (!confirmDelete) return;
    try {
      // 삭제 요청 보내기
      await axios.delete(`http://localhost:8000/product/delete/${ud_idx}`);
      navigate('/market'); // 삭제 후 마켓 페이지로 리다이렉트
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제 중 문제가 발생했습니다.');
    }
  };

  // 홈 클릭시 마켓 메인 이동
  const handleHomeClick = () => {
    navigate('/market');
  };

  return (
    <>
      <MarketHeader />
      <div className="center">
        <div id="market-detail-container" className="market-detail-container">
          <div id="market-detail-box" className="market-detail-box">
            <div className="img-container">
              {marketDetail && marketDetail.ud_images && (
                <img
                  src={`http://localhost:8000/static/userImg/${marketDetail.ud_images[currentImageIndex]}`}
                  alt={`Image ${currentImageIndex}`}
                />
              )}
              <div className="indicators">{renderIndicators()}</div>
              <button className="left" onClick={handlePrevImage}>
                <IoIosArrowDropleftCircle />
              </button>
              <button className="right" onClick={handleNextImage}>
                <IoIosArrowDroprightCircle />
              </button>
            </div>
            <div className="market-info-box">
              <nav aria-label="detail-category">
                <ol className="detail-category">
                  <li
                    className="detail-category1"
                    aria-current="page"
                    onClick={handleHomeClick}
                  >
                    홈{'\u00A0'}
                    {'\u00A0'}
                    {'\u00A0'}
                    {'\u00A0'}
                  </li>
                  <li className="detail-category2" aria-current="page">
                    {`>`}
                    {'\u00A0'}
                    {'\u00A0'}
                    {'\u00A0'}
                    {'\u00A0'}
                  </li>
                  <li className="detail-category2" aria-current="page">
                    {marketDetail.ud_category}
                  </li>
                </ol>
              </nav>
              <div className="detail-title">{marketDetail.ud_title}</div>
              <div className="detail-price">
                {formatPrice(marketDetail.ud_price)} 원
              </div>
              <div className="detail-ect">
                <span>
                  <IoEyeSharp />
                  {'\u00A0'} {'\u00A0'}
                  {marketDetail.viewcount}
                </span>
                <span>
                  <MdOutlineAccessTimeFilled /> {'\u00A0'}
                  {'\u00A0'}
                  {timeSince(marketDetail.ud_date)}
                </span>
              </div>
              <div>
                거래지역{'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {marketDetail.ud_region}
              </div>
              <div>
                판매자{'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {marketDetail.u_idx}
              </div>

              <div className="detail-button-user">
                <button className="detailbutton heart">
                  <PiHeartFill />
                  {'\u00A0'}
                  {'\u00A0'}찜 1
                </button>
                <button className="detailbutton chatting">
                  <PiChatTextBold />
                  {'\u00A0'}
                  {'\u00A0'}
                  채팅
                </button>
              </div>
              <div className="detail-button-seller">
                <button className="detailbutton product-change">
                  상태 변경
                </button>
                <button className="detailbutton product-edit">상품 수정</button>
                <button
                  className="detailbutton product-delete"
                  onClick={handleDelete}
                >
                  상품 삭제
                </button>
              </div>
            </div>
          </div>
          <div className="market-content-container">
            {' '}
            <div className="detail-info">상품 정보</div>
            <div className="detail-content">{marketDetail.ud_content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketDetailPage;
