import MarketEditor from '../../components/Market/MarketEditor';
import MarketHeader from '../../components/Market/MarketHeader';
import '../../styles/style.scss';

export default function MarketEditPage() {
  return (
    <>
      <MarketHeader />
      <div id="marketcontainer" className="market_container">
        <MarketEditor />
      </div>
    </>
  );
}
