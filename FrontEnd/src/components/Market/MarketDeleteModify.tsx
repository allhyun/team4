import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { marketudidx } from '../Types/MarketType';
import { useDispatch } from 'react-redux';
import { setModifyPost } from '../../store/marketmodifyReducer';
import { useSelector } from 'react-redux';

const MarketDeleteModify = (props: marketudidx) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber: number = props.ud_idx;
  const userData = useSelector((state: any) => state.user.user);
  const modifyPost = useSelector(
    (state: any) => state.market.market.modifyPost
  );
  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        // `http://localhost:8000/product/detail/${props.ud_idx}`
        `${process.env.REACT_APP_HOST}/product/detail/${props.ud_idx}`
      );
      return response.data; // 서버로부터 받은 데이터 반환
    } catch (error) {
      console.error('상품 데이터 로딩 에러:', error);
      return null; // 에러 발생 시 null 반환
    }
  };
  const modifyProduct = async () => {
    const productData = await fetchProductData(); // 서버로부터 데이터 가져오기
    if (productData) {
      dispatch(setModifyPost(productData)); // 스토어 업데이트
      navigate(`/product/modify`); // 수정 페이지로 이동
    } else {
      // 에러 처리
      alert('상품 데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
      navigate('/market'); // 에러 발생 시 사용자를 마켓 페이지로 리다이렉트
    }
  };

  const deleteProduct = async () => {
    // 사용자에게 삭제 확인 -> 발표할 땐 주석하고 실제 운용할땐 쓰는게 좋을듯!
    // const confirmDelete = window.confirm('이 게시글을 정말 삭제하시겠습니까?');
    // if (!confirmDelete) return;
    try {
      // 삭제 요청 보내기
      await axios.delete(
        `${process.env.REACT_APP_HOST}/product/delete/${props.ud_idx}`

        // `http://localhost:8000/product/delete/${props.ud_idx}`
        // 배포 axios
        // `${process.env.REACT_APP_HOST}/product/delete/${props.ud_idx}`,
      );
      navigate('/market'); // 삭제 후 마켓 페이지로 리다이렉트
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제 중 문제가 발생했습니다.');
    }
  };

  return (
    <>
      {modifyPost && userData.u_idx === modifyPost.u_idx && (
        <>
          {/* 리팩토링할 때 상태변경 구현할 것!*/}
          {/* <button className="detailbutton product-change">상태 변경</button> */}
          <button className="detailbutton product-edit" onClick={modifyProduct}>
            상품 수정
          </button>
          <button
            className="detailbutton product-delete"
            onClick={deleteProduct}
          >
            상품 삭제
          </button>
        </>
      )}
    </>
  );
};

export default MarketDeleteModify;
