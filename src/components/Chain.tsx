import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import INavLink from "../models/INavLink";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentChain, selectCurrentChain, setActiveProposals, setBlockHeight, setCommunityPool, setInflation, setTotalBonded, setUnbondingTime, setValidators } from "../store/reducers/currentChainSlice";
import { cutDecimals, tweakCommunityPool, tweakInflation, tweakUnbondingTime } from "../utils/formatting";
import CosmosRestApi from "../services/CosmosRestApi";
import IPool from "../models/IPools";
import IProposal from "../models/IProposal";
import { chains } from "../chains/chains";

function Chain() {

  const currentChain = useAppSelector(selectCurrentChain);
  const dispatch = useAppDispatch();

  // Обновляем текущую сеть, извлекая айдишник из УРЛа страницы, на случай, если переход в сеть осуществлён
  // не пошагово с домашней, а копипастом готовой ссылки, ну и просто на случай обновления страницы.
  useEffect(() => {
    const url = window.location.pathname;
    const id = url.split('/')[1];
    const chain = chains.find(c => c.chainId === id);
    if (chain) dispatch(setCurrentChain(chain));
  }, [])

  // ПОЛУЧАЕМ ДАННЫЕ О СЕТИ (с дополнительным форматированием)
  useEffect(() => {
    if (currentChain) {

      const chainApi = new CosmosRestApi(currentChain.api[0]);

      // ИНФЛЯЦИЯ
      chainApi.getInflation()
        .then(result => {
          const tweaked = tweakInflation(result.inflation);
          dispatch(setInflation(tweaked));
        })
        .catch(() => dispatch(setInflation(null)))

      // ПУЛ СООБЩЕСТВА
      chainApi.getCommunityPool()
        .then(result => {
          const pool = result.pool.find((el: IPool) => el.denom === currentChain.denom);
          const amount = pool.amount;
          const tweaked = tweakCommunityPool(amount, currentChain.decimals);
          dispatch(setCommunityPool(tweaked));
        })
        .catch(() => dispatch(setCommunityPool(null)))

      // ЗАСТЕЙКАННЫЕ МОНЕТЫ
      chainApi.getBondedTokens()
        .then(result => {
          const cutted = cutDecimals(result, currentChain.decimals);
          dispatch(setTotalBonded(cutted));
        })
        .catch(() => dispatch(setTotalBonded(null)))

      // СРОК АНБОНДА
      chainApi.getStakingParams()
        .then(result => {
          const tweaked = tweakUnbondingTime(result.unbonding_time);
          dispatch(setUnbondingTime(tweaked));
        })
        .catch(() => dispatch(setUnbondingTime(null)))

      // ВАЛИДАТОРЫ
      chainApi.getAllValidators()
        .then(result => dispatch(setValidators(result)))
        .catch(() => dispatch(setValidators(null)))

      // АКТИВНЫЕ ГОЛОСОВАНИЯ
      chainApi.getProposals()
        .then(result => {
          const active = result.proposals.filter((proposal: IProposal) => proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD');
          dispatch(setActiveProposals(active));
        })
        .catch(() => dispatch(setActiveProposals(null)));

      // ВЫСОТА БЛОКА
      chainApi.getLatestBlock()
        .then(result => dispatch(setBlockHeight(result.block.last_commit.height)))
        .catch(() => dispatch(setBlockHeight(null)))
    }

  }, [currentChain])


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