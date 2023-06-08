// Пакеты
import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectProposals, selectCurrentChain } from "../store/reducers/currentChainSlice";

// Мой код
import { tweakProposalType, tweakProposalStatus, tweakProposalPeriod } from "../utils/formatting";



function Proposal() {

  const currentId = useParams()["id"]; // из ссылки в браузерной строке получаем id текущего пропозала
  const currentChain = useAppSelector(selectCurrentChain);
  const proposals = useAppSelector(selectProposals);
  const setIsProposalsHidden = useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();
  const [currentProposal, setCurrentProposal] = useState<IProposal | null>();
  const navigate = useNavigate();

  // ПРИ ОТКРЫТИИ КОМПОНЕНТА СКРЫВАЕМ ТАБЛИЦУ ПРОПОЗАЛОВ
  useEffect(() => {
    setIsProposalsHidden(true);
  }, [])

  useEffect(() => {
    console.log(currentProposal);

  }, [currentProposal])

  // ПОЛУЧАЕМ ОБЪЕКТ ТЕКУЩЕГО ПРОПОЗАЛА
  useEffect(() => {
    const proposal = proposals?.find((prop: { proposal_id: string }) => prop.proposal_id === currentId);
    if (proposal) setCurrentProposal(proposal);
    else setCurrentProposal(null);
  }, [currentId, currentChain, proposals])

  // ВОЗВРАТ К ТАБЛИЦЕ ПРОПОЗАЛОВ
  const returnToProposals = () => {
    navigate(`/${currentChain?.chainId}/proposals`);
    setIsProposalsHidden(false);
  }

  let idText, titleText, typeText, statusText, statusStyle, submitTimeText, depositEndText, depositText, symbolText, votingStartText, votingEndText, abstainText, noText, noWithVetoText, yesText, descriptionText;

  if (currentProposal) {

    idText = "#" + currentProposal.proposal_id;
    titleText = currentProposal.content.title;
    typeText = tweakProposalType(currentProposal.content['@type']);
    statusText = tweakProposalStatus(currentProposal.status);

    if (currentProposal.status === "PROPOSAL_STATUS_DEPOSIT_PERIOD") {
      statusStyle = "proposal-tr__status proposal-tr__status_neutral"
    } else if (currentProposal.status === "PROPOSAL_STATUS_VOTING_PERIOD") {
      statusStyle = "proposal-tr__status proposal-tr__status_neutral"
    } else if (currentProposal.status === "PROPOSAL_STATUS_PASSED") {
      statusStyle = "proposal-tr__status proposal-tr__status_good"
    } else if (currentProposal.status === "PROPOSAL_STATUS_REJECTED") {
      statusStyle = "proposal-tr__status proposal-tr__status_bad"
    } else if (currentProposal.status === "PROPOSAL_STATUS_FAILED") {
      statusStyle = "proposal-tr__status proposal-tr__status_bad"
    } else {
      statusStyle = "proposal-tr__status proposal-tr__status_bad"
    }

    submitTimeText = tweakProposalPeriod(currentProposal.submit_time);
    depositEndText = tweakProposalPeriod(currentProposal.deposit_end_time);
    depositText = currentProposal.total_deposit[0].amount;
    symbolText = currentProposal.total_deposit[0].denom;
    votingStartText = tweakProposalPeriod(currentProposal.voting_start_time);
    votingEndText = tweakProposalPeriod(currentProposal.voting_end_time);
    const abstain = Number(currentProposal.final_tally_result.abstain);
    const no = Number(currentProposal.final_tally_result.no);
    const noWithVeto = Number(currentProposal.final_tally_result.no_with_veto);
    const yes = Number(currentProposal.final_tally_result.yes);
    const votesSum = abstain + no + noWithVeto + yes;
    abstainText = abstain / (votesSum / 100);
    noText = no / (votesSum / 100);
    noWithVetoText = noWithVeto / (votesSum / 100);
    yesText = yes / (votesSum / 100);
    (isNaN(abstainText)) ? abstainText = 0 : abstainText = abstainText.toFixed(4) + "%";
    (isNaN(noText)) ? noText = 0 : noText = noText.toFixed(4) + "%";
    (isNaN(noWithVetoText)) ? noWithVetoText = 0 : noWithVetoText = noWithVetoText.toFixed(4) + "%";
    (isNaN(yesText)) ? yesText = 0 : yesText = yesText.toFixed(4) + "%";
    descriptionText = currentProposal.content.description;
  }

  return (
    <div className="proposal">
      <button onClick={() => returnToProposals()} className="proposal__return-button"><span>&#8249;</span> Proposals</button>
      <div className="proposal__card">
        <div className="proposal__heading">
          <span className="proposal__id">{idText}</span>
          <h1 className="proposal__title">{titleText}</h1>
        </div>
        <p className="proposal__data"><span>Type: </span>{typeText}</p>
        <p className="proposal__status">Status: <span>{statusText}</span></p>
        <p className="proposal__data"><span>Submit time: </span>{submitTimeText}</p>
        <p className="proposal__data"><span>Deposit end time: </span>{depositEndText}</p>
        <p className="proposal__data"><span>Deposit: </span>{`${depositText} ${symbolText}`}</p>
        <p className="proposal__data"><span>Voting start time: </span>{votingStartText}</p>
        <p className="proposal__data"><span>Voting end time: </span>{votingEndText}</p>
        <div className="proposal__votes">
          <span className="proposal__votes-heading">Final Votes:</span>
          <ul className="proposal__votes-list">
            <li className="proposal__vote">Abstain: <span>{abstainText}</span></li>
            <li className="proposal__vote">No: <span>{noText}</span></li>
            <li className="proposal__vote">No with veto: <span>{noWithVetoText}</span></li>
            <li className="proposal__vote">Yes: <span>{yesText}</span></li>
          </ul>
        </div>
        <div className="proposal__description">
          <span className="proposal__description-heading">Description:</span>
          <p className="proposal__description-text">{descriptionText}</p>
        </div>
      </div>
    </div>
  )
}

export default Proposal;