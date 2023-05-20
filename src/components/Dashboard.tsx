import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setCurrentChain, selectCommunityPool, selectTotalBonded, selectUnbondingTime, selectValidators, selectActiveProposals, selectBlockHeight, } from "../store/reducers/currentChainSlice";
import { selectCurrentChain, selectInflation } from "../store/reducers/currentChainSlice";
import { coinGeckoApi } from "../services/coinGecko";
import ICoin from "../models/ICoin";
import { Link } from "react-router-dom";
import { cutDecimals, cutExtra, tweakPrice, filterActive, getPath } from "../utils/formatting";
import { useEffect, useState } from "react";

function Dashboard() {

  const { data: coins } = coinGeckoApi.useFetchCoinsQuery(null);
  const currentChain = useAppSelector(selectCurrentChain);
  const inflation = useAppSelector(selectInflation);
  const communityPool = useAppSelector(selectCommunityPool);
  const totalBonded = useAppSelector(selectTotalBonded);
  const unbondingTime = useAppSelector(selectUnbondingTime);
  const blockHeight = useAppSelector(selectBlockHeight);
  const validators = useAppSelector(selectValidators);
  const activeProposals = useAppSelector(selectActiveProposals);
  let price;
  let wholeSetLength;
  let activeSetLength;

  if (coins && currentChain?.coinGecko) {
    const currentCoin = coins.find((coin: ICoin) => coin.id === currentChain.coinGecko);
    currentCoin ? price = currentCoin.current_price : price = null;
  }

  if (validators) {
    wholeSetLength = validators.length;
    activeSetLength = filterActive(validators).length;
  }

  // РЕНДЕР ОСНОВНОЙ ИНФОРМАЦИИ О СЕТИ
  const heading = (currentChain === null) ? '' : currentChain.isMain ? currentChain.name : `${currentChain.name} Testnet`;
  const subheading = (currentChain === null) ? '' : `${currentChain.isMain ? 'mainnet' : 'testnet'} · ${currentChain.chain}`;
  const description = (currentChain === null) ? '' : currentChain.description;
  const errorEl = <span className="dashboard__plate-error"><span>Oops!</span><br />something<br />went wrong</span>;

  // РЕНДЕР ИНФЛЯЦИИ
  let inflationEl = errorEl;
  if (inflation) {
    const value = (Number(inflation) * 100).toFixed(2) + '%';
    inflationEl = <span className="chain__plate-data">{value}</span>;
  }

  // РЕНДЕР ПУЛА СООБЩЕСТВА
  let communityPoolEl = errorEl;
  if (communityPool && currentChain) {
    const value = Number(cutDecimals(communityPool, currentChain.decimals)).toLocaleString('en');
    communityPoolEl = <span className="dashboard__plate-tokens">{value}<span>{currentChain.symbol}</span></span>;
  }

  // РЕНДЕР ЗАСТЕЙКАННЫХ ТОКЕНОВ
  let totalBondedEl = errorEl;
  if (totalBonded && currentChain) {
    const value = Number(cutDecimals(totalBonded, currentChain.decimals)).toLocaleString('en');
    totalBondedEl = <span className="dashboard__plate-tokens">{value}<span>{currentChain.symbol}</span></span>;
  }

  // РЕНДЕР АНБОНДИНГА
  let unbondingEl = errorEl;
  if (unbondingTime) {
    const value = `${unbondingTime} days`;
    unbondingEl = <span className="chain__plate-data">{value}</span>;
  }

  // РЕНДЕР ВЫСОТЫ БЛОКА
  let blockHeightEl = errorEl;
  if (blockHeight) {
    const value = Number(blockHeight).toLocaleString('en');
    blockHeightEl = <span className="chain__plate-data">{value}</span>;
  }

  // РЕНДЕР ВАЛИДАТОРОВ
  let validatorsEl = errorEl;
  if (activeSetLength && wholeSetLength) {
    validatorsEl = <Link to="validators" className="chain__plate-link">{activeSetLength}/{wholeSetLength}</Link>;
  }

  // РЕНДЕР ГОЛОСОВАНИЙ
  let proposalsEl = errorEl;
  if (activeProposals && activeProposals.length !== 0) {
    proposalsEl = <Link to="proposals" className="dashboard__plate-link">{activeProposals.length} active</Link>;
  }
  else if (activeProposals && activeProposals.length === 0) {
    proposalsEl = <span className="dashboard__plate-data">none</span>;
  }


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
          {totalBondedEl}
        </div>

        {/* ПУЛ СООБЩЕСТВА */}
        <div id="community-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Community Pool:</span>
          {communityPoolEl}
        </div>

        {/* ГОЛОСОВАНИЯ */}
        <div id="proposals-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Active Proposals:</span>
          {proposalsEl}
        </div>

        {/* ЛОГО */}
        <div id="logo-plate" className="dashboard__plate">
          <div style={{ backgroundImage: `url()` }} className="dashboard__plate-logo" />
        </div>

        {/* ВЫСОТА БЛОКА */}
        <div id="block-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Block Height:</span>
          {blockHeightEl}
        </div>

        {/* ВАЛИДАТОРЫ */}
        <div id="validators-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Validators:</span>
          {validatorsEl}
        </div>

        {/* ИНФЛЯЦИЯ */}
        <div id="inflation-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Inflation:</span>
          {inflationEl}
        </div>

        {/* СРОКИ АНБОНДА */}
        <div id="unbonding-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Unbonding:</span>
          {unbondingEl}
        </div>

        {/* ЦЕНА */}
        <div id="price-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">Price by CoinGecko:</span>
          {price}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;