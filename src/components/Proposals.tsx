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



function Proposals() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const proposals = useAppSelector(selectProposals);
  const [reversedProposals, setReversedProposals] = useState<IProposal[] | null>(null);
  const [isProposalsHidden, setIsProposalsHidden] = useState<boolean>(false);
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
      setIsProposalsHidden(false);
    }
  }, [location])

  // ПОКАЗЫВАЕМ/СКРЫВАЕМ ТАБЛИЦУ ПРОПОЗАЛОВ
  useEffect(() => {
    (isProposalsHidden)
      ? proposalsTable.current?.classList.add("proposals__table_hidden")
      : proposalsTable.current?.classList.remove("proposals__table_hidden")
  }, [isProposalsHidden])

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

  // ПОКАЗЫВАЕМ/СКРЫВАЕМ ТАБЛИЦУ ПРОПОЗАЛОВ И КНОПКИ СКРОЛЛА
  useEffect(() => {
    if (isProposalsHidden) {
      proposalsTable.current?.classList.add("proposals__table_hidden");
      scrollButtons.current?.classList.add("proposals__scroll-buttons_hidden");
    } else {
      proposalsTable.current?.classList.remove("proposals__table_hidden");
      scrollButtons.current?.classList.remove("proposals__scroll-buttons_hidden");
    }
  }, [isProposalsHidden])

  // ЗАГЛУШКА
  const noProposalsPlaceholder = <div className="proposals__placeholder">
    <p className="proposals__placeholder-text-top">Proposals are loading or unavailable now.</p>
    <p className="proposals__placeholder-text-bottom">If it lasts too long, you may try to refresh this page (<span>press F5</span>).</p>
  </div>

  // РЕНДЕР КОНТЕНТА В ТАБЛИЦЕ
  let tableContent;
  if (!proposals) tableContent = noProposalsPlaceholder
  else tableContent = reversedProposals?.map(proposal => {
    return <ProposalsTableRow key={proposal.proposal_id} proposal={proposal} />
  })

  let disclaimerSpanText, disclaimerText, proposalText, statusText, typeText, votingEndText;

  if (currentLanguage == "eng") {
    disclaimerSpanText = "This section is work in progress.";
    disclaimerText = " Some elements may not be displayed correctly.";
    proposalText = "Proposal";
    statusText = "Status";
    typeText = "Type";
    votingEndText = "Voting End";
  } else if (currentLanguage == "rus") {
    disclaimerSpanText = "Эта секция в процессе разработки.";
    disclaimerText = " Некоторые элементы могут отображаться некорректно.";
    proposalText = "Предложение";
    statusText = "Статус";
    typeText = "Тип";
    votingEndText = "Истекает";
  }

  return (
    <div className="proposals">
      <Outlet context={setIsProposalsHidden} />
      <div className="proposals__wrapper">
        <div className="proposals__disclaimer"><span>{disclaimerSpanText}</span>{disclaimerText}</div>
        <div ref={proposalsTable} className="proposals__table">
          <div className="proposals__table-header">
            <span id="column-title" className="proposals__column-name">{proposalText}</span>
            <span id="column-status" className="proposals__column-name">{statusText}</span>
            <span id="column-type" className="proposals__column-name">{typeText}</span>
            <span id="column-voting-end" className="proposals__column-name">{votingEndText}</span>
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