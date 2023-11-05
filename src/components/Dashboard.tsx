// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  selectCurrentChain,
  selectPrice,
  selectInflation,
  selectCommunityPool,
  selectTotalBonded,
  selectUnbondingTime,
  selectValidators,
  selectProposals,
  selectBlockHeight,
  selectApi,
  setApi,
} from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import dashboardEng from "../translations/eng/dashboardEng";
import dashboardRus from "../translations/rus/dashboardRus";

// Прочее
import { tweakPrice, filterActive } from "../utils/formatting";



function Dashboard() {

  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const currentApi = useAppSelector(selectApi);
  const price = useAppSelector(selectPrice);
  const inflation = useAppSelector(selectInflation);
  const communityPool = useAppSelector(selectCommunityPool);
  const totalBonded = useAppSelector(selectTotalBonded);
  const unbondingTime = useAppSelector(selectUnbondingTime);
  const blockHeight = useAppSelector(selectBlockHeight);
  const validators = useAppSelector(selectValidators);
  const proposals = useAppSelector(selectProposals);
  const [activeProposals, setActiveProposals] = useState<IProposal[] | null>(null);

  // ФИЛЬТРАЦИЯ АКТИВНЫХ ГОЛОСОВАНИЙ
  useEffect(() => {
    const active = proposals?.filter(proposal => {
      return proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD";
    })
    active ? setActiveProposals(active) : setActiveProposals(null);
  }, [currentChain, proposals])

  // РЕНДЕР ОШИБКИ
  let noDataText;
  if (currentLanguage == "eng") noDataText = "no data";
  if (currentLanguage == "rus") noDataText = "нет данных";
  const errorEl = <span className="dashboard__error">{noDataText}</span>

  // РЕНДЕР ОСНОВНОЙ ИНФОРМАЦИИ
  const heading = currentChain?.name;
  const chainType = (currentChain?.isMainnet) ? "mainnet" : "testnet";
  const subheading = chainType + " · " + currentChain?.chainId;

  // РЕНДЕР ПУЛА СООБЩЕСТВА
  const communityPoolEl = (communityPool)
    ? <p className="dashboard__plate-data">
      {Number(communityPool).toLocaleString("en")}
      <span>{currentChain?.symbol}</span></p>
    : errorEl;

  // РЕНДЕР ЗАСТЕЙКАНЫХ ТОКЕНОВ
  const bondedTokensEl = (totalBonded)
    ? <p className="dashboard__plate-data">
      {Number(totalBonded).toLocaleString("en")}
      <span>{currentChain?.symbol}</span></p>
    : errorEl;

  // РЕНДЕР ГОЛОСОВАНИЙ
  const proposalsText = (activeProposals && activeProposals.length > 0)
    ? activeProposals.length + " prop."
    : "none";
  const proposalsEl = (activeProposals)
    ? <span className="dashboard__plate-data">{proposalsText}</span>
    : errorEl;

  // РЕНДЕР ЛОГОТИПА
  const logo = currentChain?.logo;

  // РЕНДЕР ИНФЛЯЦИИ
  const inflationEl = (inflation)
    ? <p className="dashboard__plate-data">{inflation + "%"}</p>
    : errorEl;

  // РЕНДЕР АНБОНДИНГА
  const unbondingEl = (unbondingTime)
    ? <p className="dashboard__plate-data">{unbondingTime + " days"}</p>
    : errorEl;

  // РЕНДЕР ЦЕНЫ
  const currentPriceText = (price)
    ? tweakPrice(price?.current_price) + "$"
    : "";
  const highestPriceText = (price)
    ? tweakPrice(price?.ath) + "$"
    : "";
  const lowestPriceText = (price)
    ? tweakPrice(price?.atl) + "$"
    : "";
  const marketCapText = (price)
    ? price?.market_cap.toLocaleString("en") + "$"
    : "";
  const percentage = price?.price_change_percentage_24h;
  const dynamicEl = (!percentage)
    ? errorEl
    : (percentage > 0)
      ? <div className="dashboard__coingecko-dynamic">
        &#9652;{percentage.toFixed(1)}%
      </div>
      : <div className="dashboard__coingecko-dynamic dashboard__coingecko-dynamic_down">
        &#9662;{(percentage * -1).toFixed(1)}%
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
    ? <p className="dashboard__plate-data">{activeSetLength}<span>{"/ " + wholeSetLength}</span></p>
    : errorEl;

  // РЕНДЕР ВЫСОТЫ БЛОКА
  const blockHeightEl = (blockHeight)
    ? <p className="dashboard__plate-data">{Number(blockHeight).toLocaleString("en")}</p>
    : errorEl;

  // ЛОКАЛИЗАЦИЯ
  let descriptionText;
  let translatedContent = dashboardEng;
  if (currentLanguage == "eng") {
    descriptionText = currentChain?.descriptionEng;
    translatedContent = dashboardEng;
  } else if (currentLanguage == "rus") {
    descriptionText = currentChain?.descriptionRus;
    translatedContent = dashboardRus;
  }

  // ПЕРЕКЛЮЧАЕМСЯ НА СЛЕДУЮЩУЮ АПИШКУ ПО СПИСКУ
  const switchToNextApi = () => {
    if (currentChain && currentApi) {
      const indexOfCurrentApi = currentChain.api.indexOf(currentApi);
      const arrLength = currentChain.api.length;
      (indexOfCurrentApi === arrLength - 1)
        ? dispatch(setApi(currentChain.api[0]))
        : dispatch(setApi(currentChain.api[indexOfCurrentApi + 1]))
    }
  }

  let providerName = " nothing";
  let providerNumber = " [0/0]";
  let providerAddress = "no address";
  if (currentChain && currentApi) {
    const indexOfCurrentApi = currentChain.api.indexOf(currentApi);
    const arrLength = currentChain.api.length;
    providerName = " " + currentApi.provider;
    providerNumber = " [" + (indexOfCurrentApi + 1) + "/" + arrLength + "]";
    providerAddress = currentApi.address;
  }

  return (
    <div className="dashboard">

      <div className="dashboard__providers">
        <div className="dashboard__provider-switcher">
          <p className="dashboard__provider-note">{translatedContent.noteStart}</p>
          <p className="dashboard__provider-note">{translatedContent.noteEnd}<span onClick={switchToNextApi} className="dashboard__provider-button">{translatedContent.providerButton}&#129034;</span></p>
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
          <h1 className="dashboard__heading">{heading}</h1>
          <span className="dashboard__subheading">{subheading}</span>
          <p className="dashboard__description">{descriptionText}</p>
        </div>

        {/* ПУЛ СООБЩЕСТВА */}
        <div id="community-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.communityPool}</span>
          {communityPoolEl}
        </div>

        {/* ЗАСТЕЙКАНО */}
        <div id="bonded-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.tokensBonded}</span>
          {bondedTokensEl}
        </div>

        {/* ГОЛОСОВАНИЯ */}
        <div id="proposals-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.activeProposals}</span>
          {proposalsEl}
        </div>

        {/* ЛОГО */}
        <div id="logo-plate" className="dashboard__plate">
          <div className="dashboard__logo" style={{ backgroundImage: `url(${logo})` }}></div>
        </div>

        {/* ИНФЛЯЦИЯ */}
        <div id="inflation-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.inflation}</span>
          {inflationEl}
        </div>

        {/* АНБОНДИНГ */}
        <div id="unbonding-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.unbonding}</span>
          {unbondingEl}
        </div>

        {/* ЦЕНА */}
        <div id="price-plate" className="dashboard__plate">
          <span className="dashboard__coingecko-heading">{translatedContent.pricesBy}<a href={`https://www.coingecko.com/en/coins/${currentChain?.coinGeckoId}`} target="_blank">CoinGecko</a>:</span>
          <div className="dashboard__coingecko-prices">
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.dynamic}</span>
              {dynamicEl}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.current}</span>
              {currentPriceEl}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.ath}</span>
              {highestPriceEl}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.atl}</span>
              {lowestPriceEl}
            </div>
            <div className="dashboard__coingecko-price">
              <span className="dashboard__coingecko-subheading">{translatedContent.cap}</span>
              {marketCapEl}
            </div>
          </div>
        </div>

        {/* ССЫЛКИ */}
        <div id="links-plate" className="dashboard__plate">
          {linksEl}
        </div>

        {/* ВАЛИДАТОРЫ */}
        <div id="validators-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.validators}</span>
          {validatorsEl}
        </div>

        {/* ВЫСОТА БЛОКА */}
        <div id="block-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.blockHeight}</span>
          {blockHeightEl}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;