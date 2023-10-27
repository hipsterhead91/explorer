// Пакеты
import { Link } from "react-router-dom";

// Типизация
import IProposalsTableRowProps from "../models/IProposalsTableRowProps";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";

// Мой код
import { tweakProposalType, tweakProposalStatus, tweakProposalPeriod } from "../utils/formatting";



function ProposalsTableRow(props: IProposalsTableRowProps) {

  const currentChain = useAppSelector(selectCurrentChain);
  const proposal = props.proposal;
  const idText = "#" + proposal.proposal_id;
  const titleText = (proposal.content.title) ? proposal.content.title : "[Oops!plorer: this proposal has no title]";
  const typeText = tweakProposalType(proposal.content['@type']);
  const statusText = tweakProposalStatus(proposal.status);
  const votingEndText = tweakProposalPeriod(proposal.voting_end_time);
  const dateText = votingEndText.split(",")[0];
  const timeText = votingEndText.split(",")[1];

  // СТИЛИ СТАТУСОВ
  let statusStyle;
  if (proposal.status === "PROPOSAL_STATUS_DEPOSIT_PERIOD") {
    statusStyle = "proposals-tr__status proposals-tr__status_neutral"
  } else if (proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD") {
    statusStyle = "proposals-tr__status proposals-tr__status_neutral"
  } else if (proposal.status === "PROPOSAL_STATUS_PASSED") {
    statusStyle = "proposals-tr__status proposals-tr__status_good"
  } else if (proposal.status === "PROPOSAL_STATUS_REJECTED") {
    statusStyle = "proposals-tr__status proposals-tr__status_bad"
  } else if (proposal.status === "PROPOSAL_STATUS_FAILED") {
    statusStyle = "proposals-tr__status proposals-tr__status_bad"
  } else {
    statusStyle = "proposals-tr__status proposals-tr__status_bad"
  }

  return (
    <Link to={`/${currentChain?.chainId}/proposals/${proposal.proposal_id}`} className="proposals-tr">

      {/* TITLE */}
      <div className="proposals-tr__cell">
        <span className="proposals-tr__title"><span className="proposals-tr__id">{idText}</span>{titleText}</span>
      </div>

      {/* STATUS */}
      <div className="proposals-tr__cell">
        <span className={statusStyle}>{statusText}</span>
      </div>

      {/* TYPE */}
      <div className="proposals-tr__cell">
        <span className="proposals-tr__type">{typeText}</span>
      </div>

      {/* VOTING END */}
      <div className="proposals-tr__cell">
        <div className="proposals-tr__voting-end">
          <span className="proposals-tr__end-time">{timeText}</span>
          <span className="proposals-tr__end-date">{dateText}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProposalsTableRow;