// Общее
import { Link } from "react-router-dom";

// Компоненты
import Chains from "./Chains";

// Redux
import { useAppDispatch } from "../store/hooks";
import { setCurrentChain, resetAllChainData } from "../store/reducers/currentChainSlice";



function Header() {

  const dispatch = useAppDispatch();
  const resetChain = () => {
    dispatch(resetAllChainData());
    dispatch(setCurrentChain(null));
  };

  return (
    <header className="header">
      <div className="header__container section-limiter">
        <Link to="/" onClick={() => resetChain()} className="header__logo">
          <div className="header__logo-emoji"></div>
          <div className="header__logo-text">
            <div className="header__logo-top"><span>Oops!</span>plorer</div>
            <div className="header__logo-bottom">humblest explorer ever</div>
          </div>
        </Link>
        <Chains />
      </div>
    </header>
  );
}

export default Header;