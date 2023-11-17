// Общее
import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";

// Компоненты
import ProposalsTableRow from "./ProposalsTableRow";

// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectProposals, selectCurrentChain, selectApi } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import proposalsEng from "../translations/eng/proposalsEng";
import proposalsRus from "../translations/rus/proposalsRus";
import { fetchProposals } from "../services/fetchProposals";



function Proposals() {

  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const currentApi = useAppSelector(selectApi);
  const rawProposals = useAppSelector(selectProposals);
  const [reversedProposals, setReversedProposals] = useState<IProposal[] | null>(null);
  const proposalsTable = useRef<HTMLDivElement | null>(null);

  // ПОВТОРНО ФЕТЧИМ ДАННЫЕ, ЕСЛИ ОНИ НЕ ЗАГРУЗИЛИСЬ РАНЕЕ
  useEffect(() => {
    if (currentChain && currentApi) {
      if (!rawProposals) dispatch(fetchProposals(currentApi.address));
    }
  }, [currentChain, currentApi])

  // МЕНЯЕМ ПОРЯДОК ГОЛОСОВАНИЙ НА ОБРАТНЫЙ
  useEffect(() => {
    if (rawProposals) {
      const reversed = [...rawProposals].reverse();
      setReversedProposals(reversed);
    }
  }, [rawProposals])

  // ЛОКАЛИЗАЦИЯ
  const translatedContent = (currentLanguage == "english") ? proposalsEng : proposalsRus;

  // РЕНДЕР КОНТЕНТА В ТАБЛИЦЕ
  const tableContent =
    (rawProposals)
      ? reversedProposals?.map(proposal => <ProposalsTableRow key={proposal.proposal_id} proposal={proposal} />)
      : translatedContent.noProposalsPlaceholder;

  return (
    <div className="proposals">
      <Outlet />
      <div className="proposals__wrapper">

        {/* ДИСКЛЕЙМЕР */}
        <div className="proposals__disclaimer"><span>{translatedContent.disclaimerSpan}</span>{translatedContent.disclaimer}</div>

        {/* ТАБЛИЦА */}
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
    </div>
  );
}

export default Proposals;