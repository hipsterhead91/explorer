// Пакеты
import { useEffect } from "react";
import { Link } from "react-router-dom";

// Компоненты
import ChainHeading from "./ChainHeading";

// Типизация
import ICoin from "../models/ICoin";

// Redux
import { useAppSelector } from "../store/hooks";
import {
  selectCurrentChain,
  selectPrice,
  selectInflation,
  selectCommunityPool,
  selectTotalBonded,
  selectUnbondingTime,
  selectValidators,
  selectActiveProposals,
  selectBlockHeight
} from "../store/reducers/currentChainSlice";

// Прочее
import { tweakPrice, filterActive } from "../utils/formatting";



function Dashboard() {

  const currentChain = useAppSelector(selectCurrentChain);
  const price = useAppSelector(selectPrice);
  const inflation = useAppSelector(selectInflation);
  const communityPool = useAppSelector(selectCommunityPool);
  const totalBonded = useAppSelector(selectTotalBonded);
  const unbondingTime = useAppSelector(selectUnbondingTime);
  const blockHeight = useAppSelector(selectBlockHeight);
  const validators = useAppSelector(selectValidators);
  const activeProposals = useAppSelector(selectActiveProposals);

  // РЕНДЕР ОШИБКИ
  const errorEl = <span className="dashboard__error">no data</span>

  // РЕНДЕР ОСНОВНОЙ ИНФОРМАЦИИ
  const heading = currentChain?.name;
  const chainType = (currentChain?.isMainnet) ? 'mainnet' : 'testnet';
  const subheading = chainType + ' · ' + currentChain?.chainId;
  const description = currentChain?.description;

  // РЕНДЕР ПУЛА СООБЩЕСТВА
  const communityPoolEl = (communityPool)
    ? <p className="dashboard__plate-data">
      {Number(communityPool).toLocaleString('en')}
      <span>{currentChain?.symbol}</span></p>
    : errorEl;

  // РЕНДЕР ЗАСТЕЙКАНЫХ ТОКЕНОВ
  const bondedTokensEl = (totalBonded)
    ? <p className="dashboard__plate-data">
      {Number(totalBonded).toLocaleString('en')}
      <span>{currentChain?.symbol}</span></p>
    : errorEl;

  // РЕНДЕР ГОЛОСОВАНИЙ
  const proposalsText = (activeProposals && activeProposals.length > 0)
    ? activeProposals.length + ' proposals'
    : 'none';
  const proposalsEl = (activeProposals)
    ? <Link to={`/${currentChain?.chainId}/proposals`} className="dashboard__link">
      {proposalsText}
    </Link>
    : errorEl;

  // РЕНДЕР ЛОГОТИПА
  const logo = currentChain?.logo;

  // РЕНДЕР ИНФЛЯЦИИ
  const inflationEl = (inflation)
    ? <p className="dashboard__plate-data">{inflation + '%'}</p>
    : errorEl;

  // РЕНДЕР АНБОНДИНГА
  const unbondingEl = (unbondingTime)
    ? <p className="dashboard__plate-data">{unbondingTime + ' days'}</p>
    : errorEl;

  // РЕНДЕР ЦЕНЫ
  const currentPriceText = (price)
    ? tweakPrice(price?.current_price) + '$'
    : '';
  const highestPriceText = (price)
    ? tweakPrice(price?.ath) + '$'
    : '';
  const lowestPriceText = (price)
    ? tweakPrice(price?.atl) + '$'
    : '';
  const marketCapText = (price)
    ? price?.market_cap.toLocaleString('en') + '$'
    : '';

  const percentage = price?.price_change_percentage_24h;
  const dynamicEl = (!percentage)
    ? errorEl
    : (percentage > 0)
      ? <div className="dashboard__coingecko-dynamic">
        <div className="dashboard__coingecko-arrow"></div>
        <span className="dashboard__coingecko-percentage">{percentage.toFixed(1)}%</span>
      </div>
      : <div className="dashboard__coingecko-dynamic">
        <div className="dashboard__coingecko-arrow dashboard__coingecko-arrow_down"></div>
        <span className="dashboard__coingecko-percentage dashboard__coingecko-percentage_down">{(percentage * -1).toFixed(1)}%</span>
      </div>

  const currentPriceEl = (price)
    ? <span className="dashboard__coingecko-value dashboard__coingecko-value_bright">{currentPriceText}</span>
    : errorEl;
  const highestPriceEl = (price)
    ? <span className="dashboard__coingecko-value">{highestPriceText}</span>
    : errorEl;
  const lowestPriceEl = (price)
    ? <span className="dashboard__coingecko-value">{lowestPriceText}</span>
    : errorEl;
  const marketCapEl = (price)
    ? <span className="dashboard__coingecko-value">{marketCapText}</span>
    : errorEl;

  // РЕНДЕР ССЫЛОК
  const linksEl = <div className="dashboard__links">
    <a href={currentChain?.links.website} target="_blank">{currentChain?.links.website}</a>
    <a href={currentChain?.links.twitter} target="_blank">{currentChain?.links.twitter}</a>
    <a href={currentChain?.links.github} target="_blank">{currentChain?.links.github}</a>
  </div>

  // РЕНДЕР ВАЛИДАТОРОВ
  const activeSetLength = (validators) ? filterActive(validators).length : 0;
  const wholeSetLength = (validators) ? validators.length : 0;
  const validatorsEl = (validators)
    ? <Link to={`/${currentChain?.chainId}/validators`} className="dashboard__link">
      {activeSetLength + '/' + wholeSetLength}
    </Link>
    : errorEl;

  // РЕНДЕР ВЫСОТЫ БЛОКА
  const blockHeightEl = (blockHeight)
    ? <p className="dashboard__plate-data">
      {Number(blockHeight).toLocaleString('en')}</p>
    : errorEl;

  return (
    <div className="dashboard">
      <div className="dashboard__plates">

        {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
        <div id="main-plate" className="dashboard__plate">
          <a href={currentChain?.links.website} target="_blank" className="dashboard__heading">{heading}</a>
          <span className="dashboard__subheading">{subheading}</span>
          <p className="dashboard__description">{description}</p>
        </div>

        {/* ПУЛ СООБЩЕСТВА */}
        <div id="community-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Community Pool:</span>
          {communityPoolEl}
        </div>

        {/* ЗАСТЕЙКАНО */}
        <div id="bonded-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Tokens Bonded:</span>
          {bondedTokensEl}
        </div>

        {/* ГОЛОСОВАНИЯ */}
        <div id="proposals-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Active Proposals:</span>
          {proposalsEl}
        </div>

        {/* ЛОГО */}
        <div id="logo-plate" className="dashboard__plate">
          <div className="dashboard__logo" style={{ backgroundImage: `url(${logo})` }}></div>
        </div>

        {/* ИНФЛЯЦИЯ */}
        <div id="inflation-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Inflation:</span>
          {inflationEl}
        </div>

        {/* АНБОНДИНГ */}
        <div id="unbonding-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Unbonding:</span>
          {unbondingEl}
        </div>

        {/* ЦЕНА */}
        <div id="price-plate" className="dashboard__plate">
          <span className="dashboard__coingecko-heading">Prices by <a href={`https://www.coingecko.com/en/coins/${currentChain?.coinGeckoId}`} target="_blank">CoinGecko</a>:</span>
          <div className="dashboard__coingecko-prices">
          <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">24h dynamic:</span>
              {dynamicEl}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">current:</span>
              {currentPriceEl}
            </div>

            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">ath:</span>
              {highestPriceEl}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">atl:</span>
              {lowestPriceEl}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">cap:</span>
              {marketCapEl}
            </div>
          </div>
        </div>

        {/* ССЫЛКИ */}
        <div id="links-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Media:</span>
          {linksEl}
        </div>

        {/* ВАЛИДАТОРЫ */}
        <div id="validators-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Validators:</span>
          {validatorsEl}
        </div>

        {/* ВЫСОТА БЛОКА */}
        <div id="block-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Block Height:</span>
          {blockHeightEl}
        </div>

      </div>
    </div>
  )


  // const { data: coins } = coinGeckoApi.useFetchCoinsQuery(null);
  // const currentChain = useAppSelector(selectCurrentChain);
  // const inflation = useAppSelector(selectInflation);
  // const communityPool = useAppSelector(selectCommunityPool);
  // const totalBonded = useAppSelector(selectTotalBonded);
  // const unbondingTime = useAppSelector(selectUnbondingTime);
  // const blockHeight = useAppSelector(selectBlockHeight);
  // const validators = useAppSelector(selectValidators);
  // const activeProposals = useAppSelector(selectActiveProposals);
  // let price;
  // let wholeSetLength;
  // let activeSetLength;

  // useEffect(() => {
  //   console.log(coins);
  // }, [coins])

  // if (coins && currentChain?.coinGeckoId) {
  //   const currentCoin = coins.find((coin: ICoin) => coin.id === currentChain.coinGeckoId);
  //   currentCoin ? price = currentCoin.current_price : price = null;
  // }

  // if (validators) {
  //   wholeSetLength = validators.length;
  //   activeSetLength = filterActive(validators).length;
  // }

  // // РЕНДЕР ОСНОВНОЙ ИНФОРМАЦИИ О СЕТИ
  // const heading = (currentChain === null) ? '' : currentChain.isMainnet ? currentChain.name : `${currentChain.name} Testnet`;
  // const subheading = (currentChain === null) ? '' : `${currentChain.isMainnet ? 'mainnet' : 'testnet'} · ${currentChain.chainId}`;
  // const description = (currentChain === null) ? '' : currentChain.description;
  // const errorEl = <span className="dashboard__plate-error">Oops! something went wrong</span>;

  // // РЕНДЕР ИНФЛЯЦИИ
  // let inflationEl = errorEl;
  // if (inflation) inflationEl = <span className="dashboard__plate-data">{inflation}%</span>;

  // // РЕНДЕР ПУЛА СООБЩЕСТВА
  // let communityPoolEl = errorEl;
  // if (communityPool && currentChain) {
  //   const formatted = Number(communityPool).toLocaleString('en');
  //   communityPoolEl = <span className="dashboard__plate-tokens">{formatted}<span>{currentChain.symbol}</span></span>;
  // }

  // // РЕНДЕР ЗАСТЕЙКАННЫХ ТОКЕНОВ
  // let totalBondedEl = errorEl;
  // if (totalBonded && currentChain) {
  //   const formatted = Number(totalBonded).toLocaleString('en');
  //   totalBondedEl = <span className="dashboard__plate-tokens">{formatted}<span>{currentChain.symbol}</span></span>;
  // }

  // // РЕНДЕР АНБОНДИНГА
  // let unbondingEl = errorEl;
  // if (unbondingTime) unbondingEl = <span className="dashboard__plate-data">{unbondingTime} days</span>;

  // // РЕНДЕР ВЫСОТЫ БЛОКА
  // let blockHeightEl = errorEl;
  // if (blockHeight) {
  //   const value = Number(blockHeight).toLocaleString('en');
  //   blockHeightEl = <span className="dashboard__plate-data">{value}</span>;
  // }

  // // РЕНДЕР ВАЛИДАТОРОВ
  // let validatorsEl = errorEl;
  // if (activeSetLength && wholeSetLength) {
  //   validatorsEl = <Link to="somewhere" className="dashboard__plate-link">{activeSetLength}/{wholeSetLength}</Link>;
  // }

  // // РЕНДЕР ГОЛОСОВАНИЙ
  // let proposalsEl = errorEl;
  // if (activeProposals && activeProposals.length !== 0) {
  //   proposalsEl = <Link to="proposals" className="dashboard__plate-link">{activeProposals.length} active</Link>;
  // }
  // else if (activeProposals && activeProposals.length === 0) {
  //   proposalsEl = <span className="dashboard__plate-data">none</span>;
  // }

  // // РЕНДЕР ЦЕНЫ
  // let priceEl = errorEl;
  // if (price && currentChain) {
  //   const value = '$' + tweakPrice(Number(price));
  //   priceEl = <a href={`https://www.coingecko.com/en/coins/${currentChain.coinGeckoId}`} target="_blank" className="dasgboard-link">{value}</a>;
  // }

  // return (
  //   <div className="dashboard">
  //     {/* <h1 className="dashboard__el">{heading}</h1>
  //     <span className="dashboard__el">{subheading}</span>
  //     <p className="dashboard__el">{description}</p>
  //     <span className="dashboard__el">Inflation: {inflationEl}</span>
  //     <span className="dashboard__el">Community Pool: {communityPoolEl}</span>
  //     <span className="dashboard__el">Total Bonded: {totalBondedEl}</span>
  //     <span className="dashboard__el">Unbonding Time: {unbondingEl}</span>
  //     <span className="dashboard__el">Block Height: {blockHeightEl} </span>
  //     <span className="dashboard__el">Validators: {validatorsEl}</span>
  //     <span className="dashboard__el">Proposals: {proposalsEl}</span>
  //     <span className="dashboard__el">Price: {priceEl}</span> */}
  //   </div>
  // );
}

export default Dashboard;