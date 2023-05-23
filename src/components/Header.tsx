// Пакеты
import { Link } from "react-router-dom";

// Компоненты
import Chains from "./Chains";

// Redux
import { useAppDispatch } from "../store/hooks";
import { setCurrentChain } from "../store/reducers/currentChainSlice";

function Header() {

  const dispatch = useAppDispatch();
  const resetChain = () => dispatch(setCurrentChain(null));

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" onClick={() => resetChain()} className="header__logo">
          <div className="header__logo-top"><span>Oops!</span>plorer</div>
          <div className="header__logo-bottom">humblest explorer ever</div>
        </Link>
        <Chains />
      </div>
    </header>
  );
}

export default Header;