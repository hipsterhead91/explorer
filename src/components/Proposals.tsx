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



function Proposals() {

  const currentChain = useAppSelector(selectCurrentChain);
  const proposals = useAppSelector(selectProposals);
  const [reversedProposals, setReversedProposals] = useState<IProposal[] | null>(null);
  const [isProposalsHidden, setIsProposalsHidden] = useState<boolean>(false);
  const proposalsTable = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

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

  return (
    <div className="proposals">
      <div className="proposals__wrapper">
        <div className="proposals__disclaimer"><span>This section is work in progress.</span> Proposal descriptions are in markdown format, and unfortunately, each author styles it to his taste, without unified rules, which means that I not only need random library to convert it from markdown to HTML, but also have to write some complicated logic to handle every author's scenario. This is why now proposals are presented with pretty ugly unformatted descriptions - sorry for it.</div>
        <Outlet context={setIsProposalsHidden} />
        <div ref={proposalsTable} className="proposals__table">
          <div className="proposals__table-header">
            <span id="column-id" className="proposals__column-name">#ID</span>
            <span id="column-title" className="proposals__column-name">Title</span>
            <span id="column-type" className="proposals__column-name">Type</span>
            <span id="column-status" className="proposals__column-name">Status</span>
            <span id="column-voting-end" className="proposals__column-name">Voting End</span>
          </div>
          <div className="proposals__table-rows">
            {reversedProposals?.map(proposal => {
              return <ProposalsTableRow key={proposal.proposal_id} proposal={proposal} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proposals;

