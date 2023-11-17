// Общее
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

// Типизация
import INavLink from "../models/INavLink";

// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setCurrentChain, selectCurrentChain, selectApi, setApi } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// API, сервисы
import { fetchAvatars } from "../services/fetchAvatars";
import { fetchValidators } from "../services/fetchValidators";
import { fetchProposals } from "../services/fetchProposals";
import { fetchCommunityPool } from "../services/fetchCommunityPool";
import { fetchTotalBonded } from "../services/fetchTotalBonded";
import { fetchInflation } from "../services/fetchInflation";
import { fetchUnbondingTime } from "../services/fetchUnbondingTime";
import { fetchBlockHeight } from "../services/fetchBlockHeight";

// Локализации
import chainEng from "../translations/eng/chainEng";
import chainRus from "../translations/rus/chainRus";

// Прочее
import { chains } from "../chains/chains";



function Chain() {

  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const currentApi = useAppSelector(selectApi);

  // ИЗВЛЕКАЕМ ТЕКУЩУЮ СЕТЬ ИЗ URL СТРАНИЦЫ
  /* Нужно при обновлении страницы, а также на случай, если переход на страницу осуществлён не пошагово с главной, а копипастом готовой ссылки в браузерную строку. */
  useEffect(() => {
    const url = window.location.pathname;
    const id = url.split('/')[1];
    const chain = chains.find(c => c.chainId === id);
    if (chain) dispatch(setCurrentChain(chain));
  }, [])

  // ПРИ ОБНОВЛЕНИИ СЕТИ ДИСПАТЧИМ В СТОР ПЕРВУЮ АПИШКУ ИЗ СПИСКА
  useEffect(() => {
    if (currentChain) {
      dispatch(setApi(currentChain.api[0]));
    }
  }, [currentChain])

  // ПОЛУЧАЕМ ДАННЫЕ О СЕТИ
  useEffect(() => {
    if (currentChain && currentApi) {
      // Получаем данные в первый раз, при монтировании компонента
      dispatch(fetchAvatars(currentChain));
      dispatch(fetchValidators(currentApi.address));
      dispatch(fetchProposals(currentApi.address));
      dispatch(fetchCommunityPool(currentApi.address));
      dispatch(fetchTotalBonded(currentApi.address));
      dispatch(fetchInflation(currentApi.address));
      dispatch(fetchUnbondingTime(currentApi.address));
      dispatch(fetchBlockHeight(currentApi.address));
      // Делаем повторные запросы на случай, если в первый раз была ошибка 429 (Too Many Requests)
      setTimeout(() => dispatch(fetchAvatars(currentChain)), 30000);
      setTimeout(() => dispatch(fetchValidators(currentApi.address)), 7000);
      setTimeout(() => dispatch(fetchProposals(currentApi.address)), 8000);
      setTimeout(() => dispatch(fetchCommunityPool(currentApi.address)), 3000);
      setTimeout(() => dispatch(fetchTotalBonded(currentApi.address)), 4000);
      setTimeout(() => dispatch(fetchInflation(currentApi.address)), 6000);
      setTimeout(() => dispatch(fetchUnbondingTime(currentApi.address)), 5000);
      setTimeout(() => dispatch(fetchBlockHeight(currentApi.address)), 2000);
      // Устанавливаем таймеры для дальнейшего обновления в фоновом режиме
      const avatarsInterval = setInterval(() => dispatch(fetchAvatars(currentChain)), 60000);
      const validatorsInterval = setInterval(() => dispatch(fetchValidators(currentApi.address)), 32000);
      const proposalsInterval = setInterval(() => dispatch(fetchProposals(currentApi.address)), 34000);
      const communityPoolInterval = setInterval(() => dispatch(fetchCommunityPool(currentApi.address)), 38000);
      const totalBondedInterval = setInterval(() => dispatch(fetchTotalBonded(currentApi.address)), 36000);
      const inflationInterval = setInterval(() => dispatch(fetchInflation(currentApi.address)), 30000);
      const unbondingTimeInterval = setInterval(() => dispatch(fetchUnbondingTime(currentApi.address)), 40000);
      const blockHeightInterval = setInterval(() => dispatch(fetchBlockHeight(currentApi.address)), 5000);
      // Сбрасываем таймеры при размонтировании компонента
      return () => {
        clearTimeout(avatarsInterval);
        clearTimeout(validatorsInterval);
        clearTimeout(proposalsInterval);
        clearTimeout(communityPoolInterval);
        clearTimeout(totalBondedInterval);
        clearTimeout(inflationInterval);
        clearTimeout(unbondingTimeInterval);
        clearTimeout(blockHeightInterval);
      };
    }
  }, [currentChain, currentApi])

  // СТИЛИ ПЕРЕКЛЮЧАТЕЛЯ ВКЛАДОК
  const linkStyle = ({ isActive }: INavLink) => {
    return (isActive) ? "chain__nav-link chain__nav-link_active" : "chain__nav-link";
  }

  // ЛОКАЛИЗАЦИЯ
  const translatedContent = (currentLanguage == "english") ? chainEng : chainRus;

  return (
    <section className="chain">

      {/* САБХЕДЕР (ВКЛАДКИ) */}
      <nav className="chain__nav subheader">
        <div className="chain__nav-container section-limiter">
          <NavLink to="dashboard" className={linkStyle}>{translatedContent.dashboard}</NavLink>
          <div className="chain__nav-divider"></div>
          <NavLink to="validators" className={linkStyle}>{translatedContent.validators}</NavLink>
          <div className="chain__nav-divider"></div>
          <NavLink to="proposals" className={linkStyle}>{translatedContent.proposals}</NavLink>
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