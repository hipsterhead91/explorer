// Пакеты
import { useRef } from "react";
import { NavLink } from "react-router-dom";

// Типизация
import IChain from "../models/IChain";
import INavLink from "../models/INavLink";

// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentChain, setCurrentChain } from "../store/reducers/currentChainSlice";

// Прочее
import { chains } from "../chains/chains";



function Chains() {

  const dispatch = useAppDispatch();
  const currentChain = useAppSelector(selectCurrentChain);
  const list = useRef<HTMLDivElement | null>(null);
  const arrow = useRef<HTMLSpanElement | null>(null);
  const overlay = useRef<HTMLDivElement | null>(null);

  const toggleChainList = () => {
    list.current?.classList.toggle("chains__list_hidden");
    arrow.current?.classList.toggle("chains__switcher-arrow_up");
    overlay.current?.classList.toggle("chains__overlay_hidden");
  };

  const hideChainList = () => {
    list.current?.classList.add("chains__list_hidden");
    arrow.current?.classList.remove("chains__switcher-arrow_up");
    overlay.current?.classList.add("chains__overlay_hidden");
  };

  const switchChain = (chain: IChain) => {
    dispatch(setCurrentChain(chain));
    hideChainList();
  };

  const currentChainText =
    (currentChain)
      ? `${currentChain.name} ${currentChain.isMainnet ? '' : 'Testnet'}`
      : "Chain is not selected";

  const chainButtonStyle = (navLink: INavLink) => {
    return (navLink.isActive)
      ? "chains__chain chains__chain_selected"
      : "chains__chain";
  }

  return (
    <div className="chains">
      <div ref={overlay} onClick={hideChainList} className="chains__overlay chains__overlay_hidden"></div>
      <button onClick={toggleChainList} className="chains__button">
        <span className="chains__current">{currentChainText}</span>
        <div className="chains__switcher">
          <span ref={arrow} className="chains__switcher-arrow" />
        </div>
      </button>
      <div ref={list} className="chains__list chains__list_hidden">
        {chains.map((chain) => {
          return (
            <NavLink
              key={chain.chainId}
              to={`/${chain.chainId}/dashboard`}
              onClick={() => switchChain(chain)}
              className={chainButtonStyle}
            >
              {`${chain.name} ${chain.isMainnet ? "" : "Testnet"}`}
              <span>({chain.chainId})</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Chains;
