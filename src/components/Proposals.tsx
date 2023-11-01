// Пакеты
import { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Компоненты
import ProposalsTableRow from "./ProposalsTableRow";

// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectProposals, selectCurrentChain } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import proposalsEng from "../translations/eng/proposalsEng";
import proposalsRus from "../translations/rus/proposalsRus";



function Proposals() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const proposals = useAppSelector(selectProposals);
  const [reversedProposals, setReversedProposals] = useState<IProposal[] | null>(null);
  const proposalsTable = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const scrollButtons = useRef<HTMLDivElement>(null);

  // МЕНЯЕМ ПОРЯДОК ГОЛОСОВАНИЙ НА ОБРАТНЫЙ
  useEffect(() => {
    if (proposals) {
      const reversed = [...proposals].reverse();
      setReversedProposals(reversed);
    }
  }, [proposals])

  // ПОКАЗЫВАЕМ ТАБЛИЦУ ПРОПОЗАЛОВ
  useEffect(() => {
    if (location.pathname === `/${currentChain?.chainId}/proposals`) {
    }
  }, [location])

  // СКРОЛЛИМ СТРАНИЦУ ВВЕРХ
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // СКРОЛЛИМ СТРАНИЦУ ВНИЗ
  const scrollToBottom = () => {
    window.scrollTo({
      top: 99999999,
      behavior: "smooth"
    });
  }

  // ЗАГЛУШКА, ЕСЛИ ВАЛИДАТОРЫ НЕ ПОЛУЧЕНЫ
  let noProposalsPlaceholder;
  if (currentLanguage == "eng") {
    noProposalsPlaceholder = <div className="proposals__placeholder">
      <p className="proposals__placeholder-text-top">Proposals are loading or unavailable now.</p>
      <p className="proposals__placeholder-text-bottom">If it lasts too long, you may try to refresh this page (<span>press F5</span>).</p>
    </div>
  } else if (currentLanguage == "rus") {
    noProposalsPlaceholder = <div className="proposals__placeholder">
      <p className="proposals__placeholder-text-top">Предложения грузятся, либо недоступны в данный момент.</p>
      <p className="proposals__placeholder-text-bottom">Если это длится слишком долго, попробуйте обновить страницу (<span>нажмите F5</span>).</p>
    </div>
  }

  // РЕНДЕР КОНТЕНТА В ТАБЛИЦЕ
  let tableContent;
  if (!proposals) tableContent = noProposalsPlaceholder
  else tableContent = reversedProposals?.map(proposal => {
    return <ProposalsTableRow key={proposal.proposal_id} proposal={proposal} />
  })

  // ЛОКАЛИЗАЦИЯ
  let translatedContent = proposalsEng;
  if (currentLanguage == "eng") translatedContent = proposalsEng;
  if (currentLanguage == "rus") translatedContent = proposalsRus;

  return (
    <div className="proposals">
      <Outlet />
      <div className="proposals__wrapper">
        <div className="proposals__disclaimer"><span>{translatedContent.disclaimerSpan}</span>{translatedContent.disclaimer}</div>
        <div ref={proposalsTable} className="proposals__table">
          <div className="proposals__table-header">
            <span id="column-title" className="proposals__column-name">{translatedContent.proposal}</span>
            <span id="column-status" className="proposals__column-name">{translatedContent.status}</span>
            <span id="column-type" className="proposals__column-name">{translatedContent.type}</span>
            <span id="column-voting-end" className="proposals__column-name">{translatedContent.votingEnd}</span>
          </div>
          <div className="proposals__table-rows">{tableContent}</div>
        </div>
      </div>
      <div ref={scrollButtons} className="proposals__scroll-buttons">
        <button onClick={scrollToTop} className="proposals__scroll-button proposals__scroll-button_top">
          <div className="proposals__scroll-arrow proposals__scroll-arrow_top"></div>
        </button>
        <button onClick={scrollToBottom} className="proposals__scroll-button proposals__scroll-button_bottom">
          <div className="proposals__scroll-arrow proposals__scroll-arrow_bottom"></div>
        </button>
      </div>
    </div>
  );
}

export default Proposals;