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

  if (coins && currentChain?.coinGeckoId) {
    const currentCoin = coins.find((coin: ICoin) => coin.id === currentChain.coinGeckoId);
    currentCoin ? price = currentCoin.current_price : price = null;
  }

  if (validators) {
    wholeSetLength = validators.length;
    activeSetLength = filterActive(validators).length;
  }

  // РЕНДЕР ОСНОВНОЙ ИНФОРМАЦИИ О СЕТИ
  const heading = (currentChain === null) ? '' : currentChain.isMainnet ? currentChain.name : `${currentChain.name} Testnet`;
  const subheading = (currentChain === null) ? '' : `${currentChain.isMainnet ? 'mainnet' : 'testnet'} · ${currentChain.chainId}`;
  const description = (currentChain === null) ? '' : currentChain.description;
  const errorEl = <span className="dashboard__plate-error">Oops! something went wrong</span>;

  // РЕНДЕР ИНФЛЯЦИИ
  let inflationEl = errorEl;
  if (inflation) {
    const value = (Number(inflation) * 100).toFixed(2) + '%';
    inflationEl = <span className="dashboard__plate-data">{value}</span>;
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
    unbondingEl = <span className="dashboard__plate-data">{value}</span>;
  }

  // РЕНДЕР ВЫСОТЫ БЛОКА
  let blockHeightEl = errorEl;
  if (blockHeight) {
    const value = Number(blockHeight).toLocaleString('en');
    blockHeightEl = <span className="dashboard__plate-data">{value}</span>;
  }

  // РЕНДЕР ВАЛИДАТОРОВ
  let validatorsEl = errorEl;
  if (activeSetLength && wholeSetLength) {
    validatorsEl = <Link to="somewhere" className="dashboard__plate-link">{activeSetLength}/{wholeSetLength}</Link>;
  }

  // РЕНДЕР ГОЛОСОВАНИЙ
  let proposalsEl = errorEl;
  if (activeProposals && activeProposals.length !== 0) {
    proposalsEl = <Link to="proposals" className="dashboard__plate-link">{activeProposals.length} active</Link>;
  }
  else if (activeProposals && activeProposals.length === 0) {
    proposalsEl = <span className="dashboard__plate-data">none</span>;
  }

  // РЕНДЕР ЦЕНЫ
  let priceEl = errorEl;
  if (price && currentChain) {
    const value = '$' + tweakPrice(Number(price));
    priceEl = <a href={`https://www.coingecko.com/en/coins/${currentChain.coinGeckoId}`} target="_blank" className="dasgboard-link">{value}</a>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard__el">{heading}</h1>
      <span className="dashboard__el">{subheading}</span>
      <p className="dashboard__el">{description}</p>
      <span className="dashboard__el">Inflation: {inflationEl}</span>
      <span className="dashboard__el">Community Pool: {communityPoolEl}</span>
      <span className="dashboard__el">Total Bonded: {totalBondedEl}</span>
      <span className="dashboard__el">Unbonding Time: {unbondingEl}</span>
      <span className="dashboard__el">Block Height: {blockHeightEl} </span>
      <span className="dashboard__el">Validators: {validatorsEl}</span>
      <span className="dashboard__el">Proposals: {proposalsEl}</span>
      <span className="dashboard__el">Price: {priceEl}</span>
    </div>
  );
}

export default Dashboard;