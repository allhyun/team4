import Search from '../../components/Layout/Search';
import '../../styles/style.scss';
import { RxHamburgerMenu } from 'react-icons/rx'; // 햄버거 아이콘
import { Icon } from '@iconify/react'; // 판매 아이콘
import { PiChatTextBold } from 'react-icons/pi'; // 채팅 아이콘
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMarketSearchDetail } from '../../store/marketSearchReducer';

export default function MarketHeader() {
  // 햄버거 메뉴 클래스 변경
  const [burger_class, setBurgerClass] = useState('burger-bar unclicked');
  const [menu_class, setMenuClass] = useState('menu-hidden');
  const [isMenuClicked, setMenuClicked] = useState(false);
  const navigate = useNavigate();

  // 햄버거메뉴 참고 유튜브 : https://www.youtube.com/watch?v=gAGcjlJyKk0

  // 헴버거 메뉴 변경
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('burger-bar clicked');
      setMenuClass('menu visible');
    } else {
      setBurgerClass('burger-bar unclicked');
    }
  };
  const dispatch = useDispatch();
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
              <div className="buger-menu">
                <RxHamburgerMenu />
                {/* <div className={burger_class} onClick={updateMenu}></div>
                <div className={burger_class} onClick={updateMenu}></div>
                <div className={burger_class} onClick={updateMenu}></div>
                <div className={burger_class} onClick={updateMenu}></div>
                <div className={burger_class} onClick={updateMenu}></div> */}
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
