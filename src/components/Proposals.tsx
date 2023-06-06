// Пакеты
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

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
  const logo = currentChain?.logo;

  // МЕНЯЕМ ПОРЯДОК ГОЛОСОВАНИЙ НА ОБРАТНЫЙ
  useEffect(() => {
    if (proposals) {
      const reversed = [...proposals].reverse();
      setReversedProposals(reversed);
    }
  }, [proposals])

  return (
    <div className="proposals">
      <Outlet />
      <div className="proposals__wrapper">
        <div className="proposals__heading">
          <h1 className="proposals__chain-name">Proposals</h1>
          <div className="proposals__chain-logo" style={{ backgroundImage: `url(${logo})` }}></div>
        </div>
        <div className="proposals__disclaimer"><span>Note:</span> this section is WIP. Proposal descriptions are in markdown format, and unfortunately, each author makes it to his taste, without unified rules, which means that I not only need random library to convert it from markdown to HTML, but also have to write some complicated logic to handle every author's scenario. Maybe I'll do it later, but now proposals are presented with pretty ugly unformatted descriptions - sorry for it.</div>
        <div className="proposals__table-header">
          {/* <span className="proposals__column-name">#ID</span>
          <span className="proposals__column-name">Title</span>
          <span className="proposals__column-name">Type</span>
          <span className="proposals__column-name">Status</span>
          <span className="proposals__column-name">Voting End</span> */}
        </div>
        <div className="proposals__table">
          {reversedProposals?.map(proposal => {
            return <ProposalsTableRow key={proposal.proposal_id} proposal={proposal} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Proposals;

