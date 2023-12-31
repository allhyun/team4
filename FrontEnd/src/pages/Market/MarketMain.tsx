import MarketCreateBox from '../../components/Market/MarketCreateBox';
import MarketHeader from '../../components/Market/MarketHeader';
import MarketThumbnailBox from '../../components/Market/MarketThumbnailBox';
import '../../styles/style.scss';

export default function MarketMain() {
  // onSearch 함수의 구현
  const onSearch = (searchTerm: string) => {
    console.log(searchTerm); // 검색 처리 로직
  };

  return (
    <>
      <MarketHeader />
      <MarketCreateBox />
      <MarketThumbnailBox />
    </>
  );
}
