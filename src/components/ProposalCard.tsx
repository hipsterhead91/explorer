// Типизация
import IProposalCardProps from "../models/IProposalCardProps";

// Мой код
import { tweakProposalType, tweakProposalStatus, tweakProposalPeriod } from "../utils/formatting";



function ProposalCard(props: IProposalCardProps) {

  const proposal = props.proposal;



  return (
    <div className="proposal-card">
      <div className="proposal-card__heading">
        <span className="proposal-card__id">#{proposal.proposal_id}</span>
        <h1 className="proposal-card__title">{proposal.content.title}</h1>
      </div>
      <p className="proposal-card__data"><span>Type: </span>{tweakProposalType(proposal.content['@type'])}</p>
      <p className="proposal-card__data"><span>Status: </span>{tweakProposalStatus(proposal.status)}</p>
      {proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD" &&
        <p className="proposal-card__data"><span>Voting End: </span>{tweakProposalPeriod(proposal.voting_end_time)}</p>}
      <p className="proposal-card__description"><span>Description: </span>{proposal.content.description}</p>
    </div>
  )
}

export default ProposalCard;