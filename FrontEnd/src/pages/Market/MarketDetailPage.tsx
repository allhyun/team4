import MarketHeader from '../../components/Market/MarketHeader';
import '../../styles/style.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
//리덕스 관련
import { useDispatch, useSelector } from 'react-redux';
import { setModifyPost } from '../../store/marketmodifyReducer';
import { setchatDetail } from '../../store/chatReducer';
//
import '../../styles/style.scss';
import { IoEyeSharp } from 'react-icons/io5'; // 조회수 아이콘
import { PiHeartFill } from 'react-icons/pi'; // 찜 아이콘
import { MdOutlineAccessTimeFilled } from 'react-icons/md'; // 시간 아이콘
import { IoIosArrowDropleftCircle } from 'react-icons/io'; // 왼쪽 아이콘
import { IoIosArrowDroprightCircle } from 'react-icons/io'; // 오른쪽 아이콘

import { PiChatTextBold } from 'react-icons/pi'; // 채팅 아이콘
import MarketDeleteModify from '../../components/Market/MarketDeleteModify';
import { DetailDataType2, Heart } from '../../components/Types/MarketType';
import MarketHeart from '../../components/Market/MarketHeart';
import { RootState } from '../../store';

const MarketDetailPage = () => {
  const userInfo = useSelector((state: RootState) => state.user.user);
  const { u_idx, nickname } = userInfo;
  const navigate = useNavigate();
  const { ud_idx } = useParams();
  const [marketDetailState, setMarketDetailState] =
    useState<DetailDataType2 | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const marketDetail = useSelector((state: any) => state.market.modifyPost);
  const [heartButtonClicked, setHeartButtonClicked] = useState(false);
  const [data, setData] = useState<Heart>({
    ud_idx: 1,
    u_idx: Number(u_idx) || null,
    h_idx: null,
  });

  // 수정 관련 :  Redux에 상태 업데이트

  useEffect(() => {
    axios
      // .get(`http://localhost:8000/product/detail/${ud_idx}`)
      // 배포용
      .get(`${process.env.REACT_APP_HOST}/product/detail/${ud_idx}`)

      // .get(`http://localhost:8000/product/detail/${ud_idx}`)
      .then((res) => {
        dispatch(setModifyPost(res.data));
        const { ud_title: st_title, ...rest } = res.data;

        const modifiedData = {
          ...rest,
          st_title,
        };

        dispatch(setchatDetail(modifiedData));
        // 상태 업데이트
      })
      .catch((error) => console.error(error));
  }, [ud_idx, dispatch]);

  useEffect(() => {
    axios
      // .get(`http://localhost:8000/product/detail/${ud_idx}`)
      // 배포용
      .get(`${process.env.REACT_APP_HOST}/product/detail/${ud_idx}`)

      .then((res) => {
        // console.log('서버 응답 데이터:', res.data);
        const productData = res.data;

        // ud_image 필드가 JSON 문자열인 경우 배열로 변환
        if (productData.ud_image && typeof productData.ud_image === 'string') {
          productData.ud_images = JSON.parse(productData.ud_image);
        } else {
          productData.ud_images = []; // 또는 기본값 설정
        }

        setMarketDetailState(res.data);
      })
      .catch((error) => console.error(error));
  }, [ud_idx]);

  // 가격 변환 함수
  const formatPrice = (price: number | null): string => {
    if (price === null) return '가격 미정';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (!marketDetailState) {
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
      marketDetailState &&
      marketDetailState.ud_images &&
      prevIndex < marketDetailState.ud_images.length - 1
        ? prevIndex + 1
        : prevIndex
    );
  };

  // 인디케이터
  const renderIndicators = () => {
    return (
      marketDetailState &&
      marketDetailState.ud_images &&
      marketDetailState.ud_images.map((_, index) => (
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
      //await axios.delete(`http://localhost:8000/product/delete/${ud_idx}`);
      // 배포용
      await axios.delete(
        `${process.env.REACT_APP_HOST}/product/delete/${ud_idx}`
      );
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

  const handleChattingClick = () => {
    navigate('/chatting', { state: { key: 'study-page' } });
  };

  return (
    <>
      <MarketHeader />
      <div className="center">
        <div id="market-detail-container" className="market-detail-container">
          <div id="market-detail-box" className="market-detail-box">
            <div className="img-container">
              {marketDetailState && marketDetailState.ud_images && (
                <img
                  src={`${process.env.REACT_APP_HOST}/static/userImg/${marketDetailState.ud_images[currentImageIndex]}`}
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
                    {marketDetailState.ud_category}
                  </li>
                </ol>
              </nav>
              <div className="detail-title">{marketDetailState.ud_title}</div>
              <div className="detail-price">
                {formatPrice(marketDetailState.ud_price)} 원
              </div>
              <div className="detail-ect">
                <span>
                  <IoEyeSharp />
                  {'\u00A0'} {'\u00A0'}
                  {marketDetailState.viewcount}
                </span>
                <span>
                  <MdOutlineAccessTimeFilled /> {'\u00A0'}
                  {'\u00A0'}
                  {timeSince(marketDetailState.ud_date)}
                </span>
              </div>
              <div>
                거래지역{'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {marketDetailState.ud_region}
              </div>
              <div>
                판매자{'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {marketDetailState.u_idx}
              </div>

              <div className="detail-button-user">
                <MarketHeart user={data.u_idx} product={data.ud_idx} />

                <button
                  className="detailbutton chatting"
                  onClick={handleChattingClick}
                >
                  <PiChatTextBold />
                  {'\u00A0'}
                  {'\u00A0'}
                  채팅
                </button>
              </div>
              <div className="detail-button-seller">
                <MarketDeleteModify ud_idx={marketDetailState.ud_idx} />
              </div>
            </div>
          </div>
          <div className="market-content-container">
            {' '}
            <div className="detail-info">상품 정보</div>
            <div className="detail-content">{marketDetailState.ud_content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketDetailPage;
