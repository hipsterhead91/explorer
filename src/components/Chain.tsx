// Пакеты
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

// Типизация
import IChainProps from "../models/IChainProps";
import ICoin from "../models/ICoin";
import IPool from "../models/IPools";
import IValidator from "../models/IValidator";
import INavLink from "../models/INavLink";

// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  selectCurrentChain,
  selectTotalBonded,
  setCurrentChain,
  setPrice,
  setInflation,
  setCommunityPool,
  setTotalBonded,
  setUnbondingTime,
  setBlockHeight,
  setValidators,
  setProposals
} from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// API, сервисы
import CosmosRestApi from "../services/CosmosRestApi";
import getAvatarsData from "../services/getAvatarsData";

// Прочее
import { chains } from "../chains/chains";
import {
  cutDecimals,
  tweakCommunityPool,
  tweakInflation,
  tweakUnbondingTime,
  addAvatars,
  addRanks,
  addVotingPower,
  filterActive,
  filterInactive,
  sortByTokens
} from "../utils/formatting";



function Chain(props: IChainProps) {

  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const totalBonded = useAppSelector(selectTotalBonded);
  const coins = props.coins;
  const [rawValidators, setRawValidators] = useState<IValidator[] | null>(null);
  /* Не понимаю, как типизировать стейт с аватарами. Как только ни пробовал, в том числе по аналогии с другими useState, но тайпскрипт постоянно ругается. Выглядит так, будто я сам интерфейс составил неправильно, но его я тоже переписывал по всякому - не помогает. */
  const [avatarsData, setAvatarsData] = useState<any>(null);

  // ИЗВЛЕКАЕМ СЕТЬ ИЗ URL СТРАНИЦЫ
  /* Нужно при обновлении страницы, а также на случай, если переход на страницу осуществлён не пошагово с главной, а копипастом готовой ссылки. */
  useEffect(() => {
    const url = window.location.pathname;
    const id = url.split('/')[1];
    const chain = chains.find(c => c.chainId === id);
    if (chain) dispatch(setCurrentChain(chain));
  }, [])

  // ПОЛУЧАЕМ МАССИВ АВАТАРОВ ДЛЯ ТЕКУЩЕЙ СЕТИ
  useEffect(() => {
    if (currentChain) {
      getAvatarsData(currentChain)
        .then(result => setAvatarsData(result))
    }
  }, [currentChain])

  // ПОЛУЧАЕМ ОСНОВНЫЕ ДАННЫЕ О СЕТИ
  useEffect(() => {
    if (currentChain) {

      const chainApi = new CosmosRestApi(currentChain.api[0]);

      // ИНФЛЯЦИЯ
      dispatch(setInflation(null));
      chainApi.getInflation()
        .then(result => {
          const tweaked = tweakInflation(result.inflation);
          dispatch(setInflation(tweaked));
        })
        .catch(() => dispatch(setInflation(null)))

      // ПУЛ СООБЩЕСТВА
      dispatch(setCommunityPool(null));
      chainApi.getCommunityPool()
        .then(result => {
          const pool = result.pool.find((el: IPool) => el.denom === currentChain.denom);
          const amount = pool.amount;
          const tweaked = tweakCommunityPool(amount, currentChain.decimals);
          dispatch(setCommunityPool(tweaked));
        })
        .catch(() => dispatch(setCommunityPool(null)))

      // ЗАСТЕЙКАННЫЕ МОНЕТЫ
      dispatch(setTotalBonded(null));
      chainApi.getBondedTokens()
        .then(result => {
          const cutted = cutDecimals(result, currentChain.decimals);
          dispatch(setTotalBonded(cutted));
        })
        .catch(() => dispatch(setTotalBonded(null)))

      // СРОК АНБОНДА
      dispatch(setUnbondingTime(null));
      chainApi.getStakingParams()
        .then(result => {
          const tweaked = tweakUnbondingTime(result.unbonding_time);
          dispatch(setUnbondingTime(tweaked));
        })
        .catch(() => dispatch(setUnbondingTime(null)))

      // ВАЛИДАТОРЫ
      /* Примечание: здесь мы получаем сырой массив валидаторов и отправляем его в локальный стейт компонента, не в стор редакса. Позже произведём окончательное форматирование, и тогда уже сохраним его в сторе. */
      setRawValidators([]);
      chainApi.getAllValidators()
        .then(result => setRawValidators(result))
        .catch(() => setRawValidators([]))

      // ГОЛОСОВАНИЯ
      dispatch(setProposals(null));
      chainApi.getProposals()
        .then(result => dispatch(setProposals(result.proposals)))
        .catch(() => dispatch(setProposals(null)));

      // ВЫСОТА БЛОКА
      /* В прошлой реализации эксплорера (без Redux) return нужен был для выполнения кода при размонтировании компонента - в моём случае он сбрасывает таймер. Без этого при переключении между различными сетями рендер данных начинал лагать, показывая информацию то из одной сети, то из другой. Как я понял, это происходило потому, что если таймер не сбросить, то он сохранял используемое им лексическое окружение, и простое переключение сети не помогало. Как в этой реализации - честно, не знаю, не проверял, но на всякий решил оставить как есть. */
      dispatch(setBlockHeight(null));
      const setLatestBlock = () => {
        chainApi.getLatestBlock()
          .then(result => dispatch(setBlockHeight(result.block.last_commit.height)))
          .catch(() => dispatch(setBlockHeight(null)))
      };
      setLatestBlock();
      const latestBlockTimer = setInterval(setLatestBlock, 5000); // 5 сек.
      return () => { clearTimeout(latestBlockTimer) };
    }
  }, [currentChain])

  // ФОРМАТИРОВАНИЕ ВАЛИДАТОРОВ
  /* Почему такие сложные махинации? Потому, что у неактивного валидатора стейк может быть больше, чем у активного, и если сортировать их по стейку сразу, всех вместе, то может получиться так, что активы и неактивы будут чередоваться, а такого быть не должно - сначала обязательно должны идти активы, и только потом неактивы, даже если у них стейк больше. */
  useEffect(() => {
    if (rawValidators && totalBonded && avatarsData) {
      let active = filterActive(rawValidators);
      let inactive = filterInactive(rawValidators);
      active = sortByTokens(active);
      inactive = sortByTokens(inactive);
      let all = active.concat(inactive);
      all = addRanks(all);
      all = addVotingPower(all, totalBonded);
      all = addAvatars(all, avatarsData);
      dispatch(setValidators(all));
    }
  }, [currentChain, totalBonded, avatarsData, rawValidators])

  // ПУШИМ В СТЕЙТ ЦЕНУ ТОКЕНА
  useEffect(() => {
    if (coins && currentChain?.coinGeckoId) {
      const currentCoin = coins.find((coin: ICoin) => coin.id === currentChain.coinGeckoId);
      (currentCoin)
        ? dispatch(setPrice(currentCoin))
        : dispatch(setPrice(null));
    } else {
      dispatch(setPrice(null));
    }
  }, [currentChain, coins])

  const linkStyle = ({ isActive }: INavLink) => {
    return (isActive) ? "chain__nav-link chain__nav-link_active" : "chain__nav-link";
  }

  let dashboardText, validatorsText, proposalsText;

  if (currentLanguage == "eng") {
    dashboardText = "Dashboard";
    validatorsText = "Validators";
    proposalsText = "Proposals";
  } else if (currentLanguage == "rus") {
    dashboardText = "Информация";
    validatorsText = "Валидаторы";
    proposalsText = "Предложения";
  }

  return (
    <section className="chain">

      {/* САБХЕДЕР (НАВИГАЦИЯ) */}
      <nav className="chain__nav subheader">
        <div className="chain__nav-container section-limiter">
          <NavLink to="dashboard" className={linkStyle}>{dashboardText}</NavLink>
          <div className="chain__nav-divider"></div>
          <NavLink to="validators" className={linkStyle}>{validatorsText}</NavLink>
          <div className="chain__nav-divider"></div>
          <NavLink to="proposals" className={linkStyle}>{proposalsText}</NavLink>
        </div>
      </nav>

      {/* НЕПОСРЕДСТВЕННО КОНТЕНТ */}
      <div className="chain__container section-limiter">
        <Outlet />
      </div>
    </section>
  );
}

export default Chain;