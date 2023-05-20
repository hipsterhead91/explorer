import { useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { chains } from "../chains/chains";
import { getPath } from "../utils/formatting";
import INavLink from "../models/INavLink";
import IChain from "../models/IChain";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setCurrentChain } from "../store/reducers/currentChainSlice";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";

function Chains() {

  // В доках и видосах всегда выносят useAppDispatch() в переменную dispatch. Судя по всему, это делается потому,
  // что хуки нельзя использовать в коллбэках: то есть, например, его не получится повесить на кнопку в onClick
  // напрямую, а через такую "прослойку" - можно.
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

  const currentChainText = (currentChain === null) ? 'Chain is not selected' : `${currentChain.name} ${currentChain.isMain ? '' : 'Testnet'}`;

  const chainButtonStyle = ({ isActive }: INavLink) => isActive ? "chains__chain chains__chain_selected" : "chains__chain";

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
            <NavLink key={chain.chain} to={`/${getPath(chain)}/dashboard`} onClick={() => switchChain(chain)} className={chainButtonStyle}>
              {`${chain.name} ${chain.isMain ? "" : "Testnet"}`}{" "}
              <span>({chain.chain})</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Chains;
