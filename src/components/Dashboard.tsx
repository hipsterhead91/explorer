// Типизация
import IDashboardProps from "../models/IDashboardProps";
import IProposal from "../models/IProposal";

// Redux
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentChain, selectApi, selectValidators, selectProposals, selectCommunityPool, selectTotalBonded, selectInflation, selectUnbondingTime, selectBlockHeight, setApi } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import dashboardEng from "../translations/eng/dashboardEng";
import dashboardRus from "../translations/rus/dashboardRus";

// Прочее
import { tweakPrice, filterActive } from "../utils/formatting";



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

  // // ПЕРЕКЛЮЧАЕМСЯ НА СЛЕДУЮЩЕГО ПРОВАЙДЕРА ПО СПИСКУ
  // const switchToNextProvider = () => {
  //   if (currentChain && currentApi) {
  //     const indexOfCurrentApi = currentChain.api.indexOf(currentApi);
  //     const arrLength = currentChain.api.length;
  //     (indexOfCurrentApi === arrLength - 1)
  //       ? dispatch(setApi(currentChain.api[0]))
  //       : dispatch(setApi(currentChain.api[indexOfCurrentApi + 1]))
  //   }
  // }

  // let providerName = " nothing";
  // let providerNumber = " [0/0]";
  // let providerAddress = "no address";
  // if (currentChain && currentApi) {
  //   const indexOfCurrentApi = currentChain.api.indexOf(currentApi);
  //   const arrLength = currentChain.api.length;
  //   providerName = " " + currentApi.provider;
  //   providerNumber = " [" + (indexOfCurrentApi + 1) + "/" + arrLength + "]";
  //   providerAddress = currentApi.address;
  // }

  // РЕНДЕР ОШИБКИ
  let noDataText;
  if (currentLanguage == "english") noDataText = "no data";
  if (currentLanguage == "russian") noDataText = "нет данных";
  const errorElement = <span className="dashboard__error">{noDataText}</span>

  // РЕНДЕР ОСНОВНОЙ ИНФОРМАЦИИ
  const heading = currentChain?.name;
  const chainType = (currentChain?.isMainnet) ? "mainnet" : "testnet";
  const subheading = chainType + " · " + currentChain?.chainId;

  // РЕНДЕР ЛОГОТИПА
  const logo = currentChain?.logo;

  // РЕНДЕР ССЫЛОК
  const linksElement = <div className="dashboard__links">
    <a href={currentChain?.links.website} target="_blank">{currentChain?.links.website}</a>
    <a href={currentChain?.links.twitter} target="_blank">{currentChain?.links.twitter}</a>
    <a href={currentChain?.links.github} target="_blank">{currentChain?.links.github}</a>
  </div>

  // // РЕНДЕР ВАЛИДАТОРОВ
  // const activeSetLength = (validators) ? filterActive(validators).length : 0;
  // const wholeSetLength = (validators) ? validators.length : 0;
  // const validatorsEl = (validators)
  //   ? <p className="dashboard__plate-data">{activeSetLength}<span>{"/ " + wholeSetLength}</span></p>
  //   : errorEl;

  // ФИЛЬТРАЦИЯ АКТИВНЫХ ГОЛОСОВАНИЙ
  useEffect(() => {
    const active = rawProposals?.filter(proposal => {
      return proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD";
    })
    active ? setActiveProposals(active) : setActiveProposals(null);
  }, [currentChain, rawProposals])

  // РЕНДЕР ГОЛОСОВАНИЙ
  const proposalsText = (activeProposals && activeProposals.length > 0)
    ? activeProposals.length + " prop."
    : "none";
  const proposalsElement = (activeProposals)
    ? <span className="dashboard__plate-data">{proposalsText}</span>
    : errorElement;

  // // РЕНДЕР ПУЛА СООБЩЕСТВА
  // const communityPoolEl = (communityPool)
  //   ? <p className="dashboard__plate-data">
  //     {Number(communityPool).toLocaleString("en")}
  //     <span>{currentChain?.symbol}</span></p>
  //   : errorEl;

  // // РЕНДЕР ЗАСТЕЙКАНЫХ ТОКЕНОВ
  // const bondedTokensEl = (totalBonded)
  //   ? <p className="dashboard__plate-data">
  //     {Number(totalBonded).toLocaleString("en")}
  //     <span>{currentChain?.symbol}</span></p>
  //   : errorEl;

  // // РЕНДЕР ИНФЛЯЦИИ
  // const inflationEl = (inflation)
  //   ? <p className="dashboard__plate-data">{inflation + "%"}</p>
  //   : errorEl;

  // // РЕНДЕР АНБОНДИНГА
  // const unbondingEl = (unbondingTime)
  //   ? <p className="dashboard__plate-data">{unbondingTime + " days"}</p>
  //   : errorEl;

  // // РЕНДЕР ВЫСОТЫ БЛОКА
  // const blockHeightEl = (blockHeight)
  //   ? <p className="dashboard__plate-data">{Number(blockHeight).toLocaleString("en")}</p>
  //   : errorEl;

  // // РЕНДЕР ЦЕНЫ
  // const currentPriceText = (price)
  //   ? tweakPrice(price?.current_price) + "$"
  //   : "";
  // const highestPriceText = (price)
  //   ? tweakPrice(price?.ath) + "$"
  //   : "";
  // const lowestPriceText = (price)
  //   ? tweakPrice(price?.atl) + "$"
  //   : "";
  // const marketCapText = (price)
  //   ? price?.market_cap.toLocaleString("en") + "$"
  //   : "";
  // const percentage = price?.price_change_percentage_24h;
  // const dynamicEl = (!percentage)
  //   ? errorEl
  //   : (percentage > 0)
  //     ? <div className="dashboard__coingecko-dynamic">
  //       &#9652;{percentage.toFixed(1)}%
  //     </div>
  //     : <div className="dashboard__coingecko-dynamic dashboard__coingecko-dynamic_down">
  //       &#9662;{(percentage * -1).toFixed(1)}%
  //     </div>
  // const currentPriceEl = (price)
  //   ? <span className="dashboard__coingecko-value dashboard__coingecko-value_bright">{currentPriceText}</span>
  //   : errorEl;
  // const highestPriceEl = (price)
  //   ? <span className="dashboard__coingecko-value">{highestPriceText}</span>
  //   : errorEl;
  // const lowestPriceEl = (price)
  //   ? <span className="dashboard__coingecko-value">{lowestPriceText}</span>
  //   : errorEl;
  // const marketCapEl = (price)
  //   ? <span className="dashboard__coingecko-value">{marketCapText}</span>
  //   : errorEl;

  // ЛОКАЛИЗАЦИЯ
  let descriptionText;
  let translatedContent = dashboardEng;
  if (currentLanguage == "english") {
    descriptionText = currentChain?.descriptionEng;
    translatedContent = dashboardEng;
  } else if (currentLanguage == "russian") {
    descriptionText = currentChain?.descriptionRus;
    translatedContent = dashboardRus;
  }



  return (
    <div className="dashboard">

      {/* ПРОВАЙДЕРЫ */}
      {/* <div className="dashboard__providers">
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
      </div> */}

      <div className="dashboard__grid">
        {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
        <div id="main-plate" className="dashboard__plate">
          <h1 className="dashboard__heading">{heading}</h1>
          <span className="dashboard__subheading">{subheading}</span>
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
        {/* <div id="validators-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.validators}</span>
          {validatorsEl}
        </div> */}

        {/* ГОЛОСОВАНИЯ */}
        <div id="proposals-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.activeProposals}</span>
          {proposalsElement}
        </div>

        {/* ПУЛ СООБЩЕСТВА */}
        {/* <div id="community-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.communityPool}</span>
          {communityPoolEl}
        </div> */}

        {/* ЗАСТЕЙКАНО */}
        {/* <div id="bonded-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.tokensBonded}</span>
          {bondedTokensEl}
        </div> */}

        {/* ИНФЛЯЦИЯ */}
        {/* <div id="inflation-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.inflation}</span>
          {inflationEl}
        </div> */}

        {/* АНБОНДИНГ */}
        {/* <div id="unbonding-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.unbonding}</span>
          {unbondingEl}
        </div> */}

        {/* ВЫСОТА БЛОКА */}
        {/* <div id="block-plate" className="dashboard__plate">
          <span className="dashboard__plate-heading">{translatedContent.blockHeight}</span>
          {blockHeightEl}
        </div> */}

        {/* ЦЕНА */}
        {/* <div id="price-plate" className="dashboard__plate">
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
        </div> */}

      </div>
    </div>
  );
}

export default Dashboard;