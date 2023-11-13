// Типизация
import IVotesProps from "../models/IVotesProps";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";

// Прочее
import { tweakTokens } from "../utils/formatting";



function Votes(props: IVotesProps) {

  const currentChain = useAppSelector(selectCurrentChain);
  const denom = currentChain?.denom;
  const currentProposal = props.proposal;

  // ФОРМАТИРОВАНИЕ ДАННЫХ
  let yesPercent, noPercent, vetoPercent, abstainPercent, yesTokens, noTokens, vetoTokens, abstainTokens;

  if (currentProposal) {
    const yes = currentProposal.final_tally_result.yes;
    const no = currentProposal.final_tally_result.no;
    const veto = currentProposal.final_tally_result.no_with_veto;
    const abstain = currentProposal.final_tally_result.abstain;
    const votesSum = Number(abstain) + Number(no) + Number(veto) + Number(yes);
    yesTokens = (currentChain) ? tweakTokens(yes, currentChain) : 0;
    noTokens = (currentChain) ? tweakTokens(no, currentChain) : 0;
    vetoTokens = (currentChain) ? tweakTokens(veto, currentChain) : 0;
    abstainTokens = (currentChain) ? tweakTokens(abstain, currentChain) : 0;
    yesPercent = Number(yes) / (votesSum / 100);
    noPercent = Number(no) / (votesSum / 100);
    vetoPercent = Number(veto) / (votesSum / 100);
    abstainPercent = Number(abstain) / (Number(votesSum) / 100);
    (isNaN(yesPercent)) ? yesPercent = 0 : yesPercent = yesPercent.toFixed(1) + "%";
    (isNaN(noPercent)) ? noPercent = 0 : noPercent = noPercent.toFixed(1) + "%";
    (isNaN(vetoPercent)) ? vetoPercent = 0 : vetoPercent = vetoPercent.toFixed(1) + "%";
    (isNaN(abstainPercent)) ? abstainPercent = 0 : abstainPercent = abstainPercent.toFixed(1) + "%";
  }

  const votesStyle =
    (currentProposal?.status === "PROPOSAL_STATUS_PASSED" || currentProposal?.status === "PROPOSAL_STATUS_REJECTED")
      ? "votes"
      : "votes votes_hidden";

  return (
    <div className={votesStyle}>

      <div className="votes__vote votes__vote_yes">
        <div className="votes__vote-bar votes__vote-bar_yes" style={{ width: yesPercent }}></div>
        <div className="votes__vote-info">
          <span className="votes__vote-type">Yes</span>
          <span className="votes__vote-percent">{yesPercent}</span>
          <span className="votes__vote-weight">
            <span className="votes__vote-tokens">{yesTokens}</span>
            <span className="votes__vote-symbol">{denom}</span>
          </span>
        </div>
      </div>

      <div className="votes__vote votes__vote_no">
        <div className="votes__vote-bar votes__vote-bar_no" style={{ width: noPercent }}></div>
        <div className="votes__vote-info">
          <span className="votes__vote-type">No</span>
          <span className="votes__vote-percent">{noPercent}</span>
          <span className="votes__vote-weight">
            <span className="votes__vote-tokens">{noTokens}</span>
            <span className="votes__vote-symbol">{denom}</span>
          </span>
        </div>
      </div>

      <div className="votes__vote votes__vote_veto">
        <div className="votes__vote-bar votes__vote-bar_veto" style={{ width: vetoPercent }}></div>
        <div className="votes__vote-info">
          <span className="votes__vote-type">Veto</span>
          <span className="votes__vote-percent">{vetoPercent}</span>
          <span className="votes__vote-weight">
            <span className="votes__vote-tokens">{vetoTokens}</span>
            <span className="votes__vote-symbol">{denom}</span>
          </span>
        </div>
      </div>

      <div className="votes__vote votes__vote_abstain">
        <div className="votes__vote-bar votes__vote-bar_abstain" style={{ width: abstainPercent }}></div>
        <div className="votes__vote-info">
          <span className="votes__vote-type">Abstain</span>
          <span className="votes__vote-percent">{abstainPercent}</span>
          <span className="votes__vote-weight">
            <span className="votes__vote-tokens">{abstainTokens}</span>
            <span className="votes__vote-symbol">{denom}</span>
          </span>
        </div>
      </div>

    </div>
  );
}

export default Votes;