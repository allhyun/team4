import Search from '../../components/Layout/Search';
import '../../styles/style.scss';

export default function MarketHeader() {
  // onSearch 함수의 구현
  const onSearch = (searchTerm: string) => {
    console.log('market 검색어:', searchTerm); // 검색 처리 로직
  };

  return (
    <>
      <div className="market_header">
        <Search placeholder="어떤 상품을 찾으시나요?" onSearch={onSearch} />
      </div>
    </>
  );
}
