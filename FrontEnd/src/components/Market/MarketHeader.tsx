import Search from '../../components/Layout/Search';
import '../../styles/style.scss';
import { RxHamburgerMenu } from 'react-icons/rx'; // 햄버거 아이콘
import { Icon } from '@iconify/react'; // 판매 아이콘
import { PiChatTextBold } from 'react-icons/pi'; // 채팅 아이콘
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMarketSearchDetail } from '../../store/marketSearchReducer';

export default function MarketHeader() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 드롭다운 open/close
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // RxHamburgerMenu 아이콘을 클릭할 때 바로 드롭다운 내용을 보이게 하려면 아래와 같이 수정
  const handleMouseEnter = () => {
    if (!isDropdownOpen) {
      toggleDropdown();
    }
  };

  // onSearch 함수의 구현
  const onSearch = (searchTerm: string | number) => {
    console.log('market 검색어:', searchTerm); // 검색 처리 로직
    // searchTerm:검색단어
    //리덕스에 올리기
    dispatch(setMarketSearchDetail(searchTerm));
    //검색페이지로 보내기
    navigate('/product/search');
  };
  //
  return (
    <>
      <div id="marketheader" className="market_header">
        <nav className="market_menu">
          <ul className="menu">
            <li className="category">
              <div className="dropdown">
                <RxHamburgerMenu
                  onClick={toggleDropdown}
                  onMouseEnter={handleMouseEnter}
                />
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <ul className="dropdown-ul">
                      <li className="cate1">도서</li>
                      <li className="cate2">전자기기</li>
                      <li className="cate3">문구</li>
                      <li className="cate4">티켓/쿠폰</li>
                      <li className="cate5">생활</li>
                      <li className="cate6">취미</li>
                      <li className="cate7">무료나눔</li>
                      <li className="cate8">기타</li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li className="search">
              <Search
                placeholder="어떤 상품을 찾으시나요?"
                onSearch={onSearch}
              />
            </li>
            <li className="sale">
              <Link to="/market/edit">
                <Icon icon="mingcute:refund-dollar-fill" />
                판매하기
              </Link>
            </li>
            <li className="chat">
              <Link to="/chatting">
                <PiChatTextBold />
                채팅
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
