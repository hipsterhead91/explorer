import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setCurrentChain, resetCurrentChain, } from "../app/reducers/currentChainSlice";
import { selectCurrentChain } from "../app/reducers/currentChainSlice";

function Dashboard() {

  const currentChain = useAppSelector(selectCurrentChain);


  const heading = (currentChain === null) ? '' : currentChain.isMain ? currentChain.name : `${currentChain.name} Testnet`;
  const subheading = (currentChain === null) ? '' : `${currentChain.isMain ? 'mainnet' : 'testnet'} · ${currentChain.chain}`;
  const description = (currentChain === null) ? '' : currentChain.description;

  return (
    <div className="dashboard">
      <div className="dashboard__plates">

        {/* ОПИСАНИЕ */}
        <div id="description-plate" className="dashboard__plate">
          <h1 className="dashboard__chain-heading">{heading}</h1>
          <span className="dashboard__chain-subheading">{subheading}</span>
          <p className="dashboard__chain-description">{description}</p>
        </div>

        {/* ЗАСТЕЙКАНО */}
        <div id="bonded-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Tokens Bonded:</span>
          {}
        </div>

        {/* ПУЛ СООБЩЕСТВА */}
        <div id="community-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Community Pool:</span>
          {}
        </div>

        {/* ГОЛОСОВАНИЯ */}
        <div id="proposals-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Active Proposals:</span>
          {}
        </div>

        {/* ЛОГО */}
        <div id="logo-plate" className="dashboard__plate">
          <div style={{ backgroundImage: `url()` }} className="dashboard__plate-logo" />
        </div>

        {/* ВЫСОТА БЛОКА */}
        <div id="block-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Block Height:</span>
          {}
        </div>

        {/* ВАЛИДАТОРЫ */}
        <div id="validators-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Validators:</span>
          {}
        </div>

        {/* ИНФЛЯЦИЯ */}
        <div id="inflation-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Inflation:</span>
          {}
        </div>

        {/* СРОКИ АНБОНДА */}
        <div id="unbonding-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Unbonding:</span>
          {}
        </div>

        {/* ЦЕНА */}
        <div id="price-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Price by CoinGecko:</span>
          {}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;