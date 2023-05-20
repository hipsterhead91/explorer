import { useEffect, useState } from "react";
import IChainProps from "../models/IChainProps";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import INavLink from "../models/INavLink";
import { coinGeckoApi } from "../services/coinGecko";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentChain, selectBlockHeight, selectCurrentChain, selectInflation, setActiveProposals, setBlockHeight, setCommunityPool, setInflation, setTotalBonded, setUnbondingTime, setValidators } from "../store/reducers/currentChainSlice";
import { cutExtra } from "../utils/formatting";
import CosmosRestApi from "../services/CosmosRestApi";
import IPool from "../models/IPools";
import IProposal from "../models/IProposal";
import { chains } from "../chains/chains";

function Chain(props: IChainProps) {

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
  // Примечание: исходное значение каждого стейта - null, и если данные загрузились успешно, то стейт меняется на 
  // загруженные данные. Но возник вопрос: если загруженные данные - это пустой массив (например в пропозалах), 
  // надо ли отправлять его в стейт пустым, или лучше сделать проверку на пустоту и также отправлять null?
  // Пока решил отправлять как есть, пустым так пустым.
  useEffect(() => {
    if (currentChain) {

      const chainApi = new CosmosRestApi(currentChain.api[0]);

      // ИНФЛЯЦИЯ
      chainApi.getInflation()
        .then(result => dispatch(setInflation(result.inflation)))
        .catch(() => dispatch(setInflation(null)))

      // ПУЛ СООБЩЕСТВА
      chainApi.getCommunityPool()
        .then(result => {
          const pool = result.pool.find((el: IPool) => el.denom === currentChain.denom);
          const amount = pool.amount;
          const cutted = cutExtra(amount, 19); // точка + 18 символов
          dispatch(setCommunityPool(cutted));
        })
        .catch(() => dispatch(setCommunityPool(null)))

      // ЗАСТЕЙКАННЫЕ МОНЕТЫ
      chainApi.getBondedTokens()
        .then(result => dispatch(setTotalBonded(result)))
        .catch(() => dispatch(setTotalBonded(null)))

      // СРОК АНБОНДА
      chainApi.getStakingParams()
        .then(result => {
          const seconds = result.unbonding_time.slice(0, -1);
          const minutes = seconds / 60;
          const hours = minutes / 60;
          const days = hours / 24;
          dispatch(setUnbondingTime(days));
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