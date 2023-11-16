// Типизация
import IDashboardProps from "../models/IDashboardProps";
import IProposal from "../models/IProposal";
import IPool from "../models/IPool";
import ICoin from "../models/ICoin";

// Redux
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentChain, selectApi, selectValidators, selectProposals, selectCommunityPool, selectTotalBonded, selectInflation, selectUnbondingTime, selectBlockHeight, setApi } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// API, сервисы
import { fetchBlockHeight } from "../services/fetchBlockHeight";

// Локализации
import dashboardEng from "../translations/eng/dashboardEng";
import dashboardRus from "../translations/rus/dashboardRus";

// Прочее
import { filterActive, tweakCommunityPool, cutDecimals, tweakInflation, tweakUnbondingTime, tweakPrice } from "../utils/formatting";



function Dashboard(props: IDashboardProps) {

  const dispatch = useAppDispatch();
  const coinGeckoPrices = props.coinGeckoPrices;
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const currentApi = useAppSelector(selectApi);
  const rawValidators = useAppSelector(selectValidators);
  const rawProposals = useAppSelector(selectProposals);
  const rawCommunityPool = useAppSelector(selectCommunityPool);
  const rawTotalBonded = useAppSelector(selectTotalBonded);
  const rawInflation = useAppSelector(selectInflation);
  const rawUnbondingTime = useAppSelector(selectUnbondingTime);
  const rawBlockHeight = useAppSelector(selectBlockHeight);
  const [activeProposals, setActiveProposals] = useState<IProposal[] | null>(null);

  // ПЕРЕКЛЮЧАЕМСЯ НА СЛЕДУЮЩЕГО ПРОВАЙДЕРА ПО СПИСКУ
  const switchToNextProvider = () => {
    if (currentChain && currentApi) {
      const indexOfCurrentApi = currentChain.api.indexOf(currentApi);
      const arrLength = currentChain.api.length;
      (indexOfCurrentApi === arrLength - 1)
        ? dispatch(setApi(currentChain.api[0]))
        : dispatch(setApi(currentChain.api[indexOfCurrentApi + 1]))
    }
  }

  // ОБНОВЛЯЕМ ВЫСОТУ БЛОКА ПО ТАЙМЕРУ
  useEffect(() => {
    if (currentApi) {
      const fetchBlock = () => dispatch(fetchBlockHeight(currentApi.address));
      const latestBlockTimer = setInterval(fetchBlock, 5000);
      return () => { clearTimeout(latestBlockTimer) };
    }
  }, [currentChain, currentApi])

  // ФИЛЬТРАЦИЯ АКТИВНЫХ ГОЛОСОВАНИЙ
  useEffect(() => {
    const active = rawProposals?.filter(proposal => {
      return proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD";
    })
    active ? setActiveProposals(active) : setActiveProposals(null);
  }, [currentChain, rawProposals])

  // ЛОКАЛИЗАЦИЯ
  const translatedContent = (currentLanguage == "english") ? dashboardEng : dashboardRus;
  const descriptionText = (currentLanguage == "english") ? currentChain?.descriptionEng : currentChain?.descriptionRus;
  const noDataText = translatedContent.noData;
  let providerName = translatedContent.providerName;
  let providerNumber = " [0/0]";
  let providerAddress = translatedContent.providerAddress;
  if (currentChain && currentApi) {
    const indexOfCurrentApi = currentChain.api.indexOf(currentApi);
    const arrLength = currentChain.api.length;
    providerName = " " + currentApi.provider;
    providerNumber = " [" + (indexOfCurrentApi + 1) + "/" + arrLength + "]";
    providerAddress = currentApi.address;
  }

  // РЕНДЕР ОШИБОК
  const errorElement = <span className="dashboard__error">{noDataText}</span>
  const noPriceElement = <span className="dashboard__price-error">{noDataText}</span>

  // РЕНДЕР ОСНОВНОЙ ИНФОРМАЦИИ
  const headingText = currentChain?.name;
  const chainTypeText = (currentChain?.isMainnet) ? "mainnet" : "testnet";
  const subheadingText = chainTypeText + " · " + currentChain?.chainId;

  // РЕНДЕР ЛОГОТИПА
  const logo = currentChain?.logo;

  // РЕНДЕР ССЫЛОК
  const linksElement =
    <div className="dashboard__links">
      <a href={currentChain?.links.website} target="_blank">{currentChain?.links.website}</a>
      <a href={currentChain?.links.twitter} target="_blank">{currentChain?.links.twitter}</a>
      <a href={currentChain?.links.github} target="_blank">{currentChain?.links.github}</a>
    </div>

  // РЕНДЕР ВАЛИДАТОРОВ
  const activeSetLength = (rawValidators) ? filterActive(rawValidators).length : 0;
  const wholeSetLength = (rawValidators) ? rawValidators.length : 0;
  const validatorsElement =
    (rawValidators)
      ? <p className="dashboard__plate-data">{activeSetLength}<span>{"/ " + wholeSetLength}</span></p>
      : errorElement;

  // РЕНДЕР ГОЛОСОВАНИЙ
  const proposalsText =
    (activeProposals && activeProposals.length > 0)
      ? activeProposals.length + " prop."
      : "none";

  const proposalsElement =
    (activeProposals)
      ? <span className="dashboard__plate-data">{proposalsText}</span>
      : errorElement;

  // РЕНДЕР ПУЛА СООБЩЕСТВА
  let communityPoolText;
  if (currentChain && rawCommunityPool) {
    const pool = rawCommunityPool.find((el: IPool) => el.denom === currentChain.denom);
    if (pool) {
      const tweaked = tweakCommunityPool(pool.amount, currentChain.decimals);
      communityPoolText = Number(tweaked).toLocaleString("en");
    }
  }
  const communityPoolElement =
    (communityPoolText)
      ? <p className="dashboard__plate-data">{communityPoolText}<span>{currentChain?.symbol}</span></p>
      : errorElement;

  // РЕНДЕР ЗАСТЕЙКАНЫХ ТОКЕНОВ
  let totalBondedText;
  if (currentChain && rawTotalBonded) {
    const cutted = cutDecimals(rawTotalBonded, currentChain.decimals);
    totalBondedText = Number(cutted).toLocaleString("en");
  }
  const totalBondedElement =
    (totalBondedText)
      ? <p className="dashboard__plate-data">{totalBondedText}<span>{currentChain?.symbol}</span></p>
      : errorElement;

  // РЕНДЕР ИНФЛЯЦИИ
  let inflationText;
  if (rawInflation) inflationText = tweakInflation(rawInflation) + "%";
  const inflationElement =
    (inflationText)
      ? <p className="dashboard__plate-data">{inflationText}</p>
      : errorElement;

  // РЕНДЕР АНБОНДИНГА
  let unbondingTimeText;
  if (rawUnbondingTime) unbondingTimeText = tweakUnbondingTime(rawUnbondingTime) + " days";
  const unbondingTimeElement =
    (unbondingTimeText)
      ? <p className="dashboard__plate-data">{unbondingTimeText}</p>
      : errorElement;

  // РЕНДЕР ВЫСОТЫ БЛОКА
  let blockHeightText;
  if (rawBlockHeight) blockHeightText = Number(rawBlockHeight).toLocaleString("en");
  const blockHeightElement =
    (blockHeightText)
      ? <p className="dashboard__plate-data">{blockHeightText}</p>
      : errorElement;

  // РЕНДЕР ЦЕНЫ
  let currentTokenInfo, dynamic, isDynamicPositive, dynamicText, currentPriceText, highestPriceText, lowestPriceText, marketCapText;
  if (currentChain && coinGeckoPrices) {
    currentTokenInfo = coinGeckoPrices.find((coin: ICoin) => coin.id === currentChain.coinGeckoId);
  }
  if (currentTokenInfo) {
    dynamic = currentTokenInfo.price_change_percentage_24h;
    isDynamicPositive = (dynamic > 0) ? true : false;
    dynamicText = (isDynamicPositive) ? dynamic.toFixed(1) + "%" : (dynamic * -1).toFixed(1) + "%";
    currentPriceText = tweakPrice(currentTokenInfo.current_price) + "$";
    highestPriceText = tweakPrice(currentTokenInfo.ath) + "$";
    lowestPriceText = tweakPrice(currentTokenInfo.atl) + "$";
    marketCapText = currentTokenInfo.market_cap.toLocaleString("en") + "$";
  }

  const dynamicElement =
    (!currentTokenInfo)
      ? noPriceElement
      : (isDynamicPositive)
        ? <div className="dashboard__coingecko-dynamic">&#9652;{dynamicText}</div>
        : <div className="dashboard__coingecko-dynamic dashboard__coingecko-dynamic_down">&#9662;{dynamicText}</div>

  const currentPriceElement =
    (currentPriceText)
      ? <span className="dashboard__coingecko-value dashboard__coingecko-value_bright">{currentPriceText}</span>
      : noPriceElement;

  const highestPriceElement =
    (highestPriceText)
      ? <span className="dashboard__coingecko-value">{highestPriceText}</span>
      : noPriceElement;

  const lowestPriceElement =
    (lowestPriceText)
      ? <span className="dashboard__coingecko-value">{lowestPriceText}</span>
      : noPriceElement;

  const marketCapElement =
    (marketCapText)
      ? <span className="dashboard__coingecko-value">{marketCapText}</span>
      : noPriceElement;

  return (
    <div className="dashboard">

      {/* ПРОВАЙДЕРЫ */}
      <div className="dashboard__providers">
        <div className="dashboard__provider-switcher">
          <p className="dashboard__provider-note">{translatedContent.noteStart}</p>
          <p className="dashboard__provider-note">{translatedContent.noteEnd}<span onClick={switchToNextProvider} className="dashboard__provider-button">{translatedContent.providerButton}&#129034;</span></p>
        </div>
        <div className="dashboard__provider-info">
          <p className="dashboard__provider">
            {translatedContent.provider}
            <span className="dashboard__provider-name">{providerName}</span>
            <span className="dashboard__provider-number">{providerNumber}</span>
          </p>
          <p className="dashboard__provider-address">{providerAddress}</p>
        </div>
      </div>

      <div className="dashboard__grid">
        {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
        <div id="main-plate" className="dashboard__plate">
          <h1 className="dashboard__heading">{headingText}</h1>
          <span className="dashboard__subheading">{subheadingText}</span>
          <p className="dashboard__description">{descriptionText}</p>
        </div>

        {/* ЛОГО */}
        <div id="logo-plate" className="dashboard__plate">
          <div className="dashboard__logo" style={{ backgroundImage: `url(${logo})` }}></div>
        </div>

        {/* ССЫЛКИ */}
        <div id="links-plate" className="dashboard__plate">
          {linksElement}
        </div>

        {/* ВАЛИДАТОРЫ */}
        <div id="validators-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.validators}</span>
          {validatorsElement}
        </div>

        {/* ГОЛОСОВАНИЯ */}
        <div id="proposals-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.activeProposals}</span>
          {proposalsElement}
        </div>

        {/* ПУЛ СООБЩЕСТВА */}
        <div id="community-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.communityPool}</span>
          {communityPoolElement}
        </div>

        {/* ЗАСТЕЙКАНО */}
        <div id="bonded-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.tokensBonded}</span>
          {totalBondedElement}
        </div>

        {/* ИНФЛЯЦИЯ */}
        <div id="inflation-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.inflation}</span>
          {inflationElement}
        </div>

        {/* АНБОНДИНГ */}
        <div id="unbonding-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.unbonding}</span>
          {unbondingTimeElement}
        </div>

        {/* ВЫСОТА БЛОКА */}
        <div id="block-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.blockHeight}</span>
          {blockHeightElement}
        </div>

        {/* ЦЕНА */}
        <div id="price-plate" className="dashboard__plate">
          <span className="dashboard__coingecko-heading">{translatedContent.pricesBy}<a href={`https://www.coingecko.com/en/coins/${currentChain?.coinGeckoId}`} target="_blank">CoinGecko</a>:</span>
          <div className="dashboard__coingecko-prices">
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.dynamic}</span>
              {dynamicElement}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.current}</span>
              {currentPriceElement}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.ath}</span>
              {highestPriceElement}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.atl}</span>
              {lowestPriceElement}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.cap}</span>
              {marketCapElement}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;