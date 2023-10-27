// Пакеты
import { useRef } from "react";
import { NavLink } from "react-router-dom";

// Типизация
import IChain from "../models/IChain";
import INavLink from "../models/INavLink";

// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentChain, setCurrentChain } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Прочее
import { chains } from "../chains/chains";



function Chains() {

  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const container = useRef<HTMLDivElement | null>(null);
  const arrow = useRef<HTMLSpanElement | null>(null);
  const overlay = useRef<HTMLDivElement | null>(null);

  // ОТКРЫТИЕ/ЗАКРЫТИЕ СПИСКА СЕТЕЙ
  const toggleChainList = () => {
    container.current?.classList.toggle("chains__popup-container_hidden");
    arrow.current?.classList.toggle("chains__indicator-arrow_up");
    overlay.current?.classList.toggle("chains__overlay_hidden");
  };

  // ЗАКРЫТИЕ СПИСКА СЕТЕЙ
  const hideChainList = () => {
    container.current?.classList.add("chains__popup-container_hidden");
    arrow.current?.classList.remove("chains__indicator-arrow_up");
    overlay.current?.classList.add("chains__overlay_hidden");
  };

  // ПЕРЕКЛЮЧЕНИЕ СЕТИ
  const switchChain = (chain: IChain) => {
    dispatch(setCurrentChain(chain));
    hideChainList();
  };

  // СТИЛИ ДЛЯ КНОПОК СЕТЕЙ
  const chainButtonStyle = (navLink: INavLink) => {
    return (navLink.isActive)
      ? "chains__chain chains__chain_selected"
      : "chains__chain";
  }

  // ЛОКАЛИЗАЦИЯ
  let popupHeadingText, noChainText;
  if (currentLanguage == "eng") {
    popupHeadingText = "Select a chain";
    noChainText = "Chain is not selected";
  } else if (currentLanguage == "rus") {
    popupHeadingText = "Выберите сеть";
    noChainText = "Сеть не выбрана";
  }
  const currentChainText = (currentChain) ? currentChain.name : noChainText;

  return (
    <div className="chains">

      {/* ПЕРЕКЛЮЧАТЕЛЬ В ШАПКЕ */}
      <button onClick={toggleChainList} className="chains__switcher">
        <span className="chains__current-chain">{currentChainText}</span>
        <div className="chains__indicator">
          <span ref={arrow} className="chains__indicator-arrow" />
        </div>
      </button>

      {/* ОВЕРЛЕЙ */}
      <div ref={overlay} onClick={hideChainList} className="chains__overlay chains__overlay_hidden"></div>

      {/* МОДАЛЬНОЕ ОКНО */}
      <div ref={container} className="chains__popup-container chains__popup-container_hidden">
        <div className="chains__popup">
          <div className="chains__popup-head">
            <span className="chains__popup-heading">{popupHeadingText}</span>
            <button onClick={hideChainList} className="chains__close-button">&#10006;</button>
          </div>
          <div className="chains__list">
            {chains.map((chain) => {
              return (
                <NavLink
                  key={chain.chainId}
                  to={`/${chain.chainId}/dashboard`}
                  onClick={() => switchChain(chain)}
                  className={chainButtonStyle}
                >
                  <div className="chains__chain-logo" style={{ backgroundImage: `url(${chain.logo})` }}></div>
                  <div className="chains__chain-info">
                    <span className="chains__chain-name">{chain.name}</span>
                    <span className="chains__chain-id">{chain.chainId}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Chains;