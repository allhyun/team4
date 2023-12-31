import MarketEditor from '../../components/Market/MarketEditor';
import MarketHeader from '../../components/Market/MarketHeader';
import '../../styles/style.scss';

export default function MarketEdit() {
  return (
    <>
      <MarketHeader />
      <div id="marketcontainer" className="market_container">
        <MarketEditor />
      </div>
    </>
  );
}
