// Пакеты
import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

// Компоненты
// import VotesChart from "./VotesChart";

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
    // setIsProposalsHidden(true);
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

    idText = "[" + "#" + currentProposal.proposal_id + "]";
    titleText = idText + " " + currentProposal.content.title;
    typeText = tweakProposalType(currentProposal.content['@type']);
    statusText = tweakProposalStatus(currentProposal.status);

    if (currentProposal.status === "PROPOSAL_STATUS_DEPOSIT_PERIOD") {
      statusStyle = "proposal__status proposal__status_neutral"
    } else if (currentProposal.status === "PROPOSAL_STATUS_VOTING_PERIOD") {
      statusStyle = "proposal__status proposal__status_neutral"
    } else if (currentProposal.status === "PROPOSAL_STATUS_PASSED") {
      statusStyle = "proposal__status proposal__status_good"
    } else if (currentProposal.status === "PROPOSAL_STATUS_REJECTED") {
      statusStyle = "proposal__status proposal__status_bad"
    } else if (currentProposal.status === "PROPOSAL_STATUS_FAILED") {
      statusStyle = "proposal__status proposal__status_bad"
    } else {
      statusStyle = "proposal__status proposal__status_bad"
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

      <div onClick={() => returnToProposals()} className="proposal__overlay"></div>

      <div className="proposal__card">
        <button onClick={() => returnToProposals()} className="proposal__close-button">&#10006;</button>
        <h1 className="proposal__title">{titleText}</h1>
        <div className="proposal__info">

          {/* <div className="proposal__alignment">
            <div className="proposal__main-info">
              <p className="proposal__data-heading">Type: <span className="proposal__data">{typeText}</span></p>
              <p className="proposal__data-heading">Status: <span className={statusStyle}>{statusText}</span></p>
              <p className="proposal__data-heading">Submit time: <span className="proposal__data">{submitTimeText}</span></p>
              <p className="proposal__data-heading">Deposit end time: <span className="proposal__data">{depositEndText}</span></p>
              <p className="proposal__data-heading">Deposit: <span className="proposal__data">{`${depositText} ${symbolText}`}</span></p>
              <p className="proposal__data-heading">Voting start time: <span className="proposal__data">{votingStartText}</span></p>
              <p className="proposal__data-heading">Voting end time: <span className="proposal__data">{votingEndText}</span></p>
            </div>
            <div className="proposal__votes">
              {currentProposal && <VotesChart votes={currentProposal.final_tally_result} />}
            </div>
          </div>

          <div className="proposal__description">
            <span className="proposal__description-heading">Description:</span>
            <p className="proposal__description-text">{descriptionText}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Proposal;