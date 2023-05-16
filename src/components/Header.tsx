import { Link } from "react-router-dom";
import Chains from "./Chains";

import { useAppDispatch } from "../store/hooks";
import { resetCurrentChain, } from "../store/reducers/currentChainSlice";

function Header() {

  // В доках и видосах всегда выносят useAppDispatch() в переменную dispatch. Судя по всему, это делается потому,
  // что хуки нельзя использовать в коллбэках: то есть, например, его не получится повесить на кнопку в onClick
  // напрямую, а через такую "прослойку" - можно.
  const dispatch = useAppDispatch();
  const resetChain = () => dispatch(resetCurrentChain());

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