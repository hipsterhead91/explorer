import { Link } from "react-router-dom";
import Chains from "./Chains";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setCurrentChain, resetCurrentChain, } from "../app/reducers/currentChainSlice";

function Header() {

  const dispatch = useAppDispatch(); // для удобства и лаконичности

  const resetChain = () => {
    dispatch(resetCurrentChain())
  }

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