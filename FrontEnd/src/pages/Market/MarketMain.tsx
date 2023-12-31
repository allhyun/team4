import MarketHeader from '../../components/Market/MarketHeader';
import '../../styles/style.scss';

export default function MarketMain() {
  // onSearch 함수의 구현
  const onSearch = (searchTerm: string) => {
    console.log(searchTerm); // 검색 처리 로직
  };

  return (
    <>
      <MarketHeader />
    </>
  );
}
