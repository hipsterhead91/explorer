import IChainProps from "../models/IChainProps";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import INavLink from "../models/INavLink";



function Chain(props: IChainProps) {



  const linkStyle = ({ isActive }: INavLink) => isActive ? "chain__nav-link chain__nav-link_active" : "chain__nav-link";

  return (
    <section className="chain">
      <div className="chain__container">
        <nav className="chain__nav">
          <div className="chain__nav-container">
            <NavLink to="dashboard" className={linkStyle}>Dashboard</NavLink>
            <div className="chain__nav-divider"></div>
            <NavLink to="validators" className={linkStyle}>Validators</NavLink>
          </div>
        </nav>
        <div className="chain__content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Chain;