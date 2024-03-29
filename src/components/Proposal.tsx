// Общее
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Компоненты
import Votes from "./Votes";

// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectProposals, selectCurrentChain } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import proposalEng from "../translations/eng/proposalEng";
import proposalRus from "../translations/rus/proposalRus";

// Прочее
import { tweakProposalType, tweakProposalStatus, tweakProposalPeriod, tweakTokens } from "../utils/formatting";



function Proposal() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentId = useParams()["id"]; // из ссылки в браузерной строке получаем id текущего пропозала
  const currentChain = useAppSelector(selectCurrentChain);
  const proposals = useAppSelector(selectProposals);
  const [currentProposal, setCurrentProposal] = useState<IProposal | null>(null);
  const navigate = useNavigate();

  // ПОЛУЧАЕМ ОБЪЕКТ ТЕКУЩЕГО ПРОПОЗАЛА
  useEffect(() => {
    const proposal = proposals?.find((prop: { proposal_id: string }) => prop.proposal_id === currentId);
    if (proposal) setCurrentProposal(proposal);
    else setCurrentProposal(null);
  }, [currentId, currentChain, proposals])

  // ВОЗВРАТ К ТАБЛИЦЕ ПРОПОЗАЛОВ
  const returnToProposals = () => {
    navigate(`/${currentChain?.chainId}/proposals`);
  }

  // ЗАКРЫТИЕ ПО КЛАВИШЕ ESCAPE
  const closeByEscapeButton = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      returnToProposals();
    }
  };

  // СЛУШАЕМ ESCAPE
  useEffect(() => {
    document.addEventListener('keydown', closeByEscapeButton);
    return () => document.removeEventListener('keydown', closeByEscapeButton);
  }, []);

  // ОТКЛЮЧАЕМ СКРОЛЛ КОНТЕНТА ПОД МОДАЛЬНЫМ ОКНОМ
  useEffect(() => {
    document.body.classList.add("noScroll");
    return () => { document.body.classList.remove("noScroll") };
  }, []);

  // ЛОКАЛИЗАЦИЯ
  let translatedContent = proposalEng;
  if (currentLanguage == "english") translatedContent = proposalEng;
  if (currentLanguage == "russian") translatedContent = proposalRus;

  // ФОРМАТИРОВАНИЕ ДАННЫХ
  let idText, titleText, typeText, statusText, statusStyle, submitTimeText, depositEndText, depositText, symbolText, votingStartText, votingEndText, abstainPercent, noPercent, vetoPercent, yesPercent, abstainTokens, noTokens, yesTokens, vetoTokens, descriptionText;
  if (currentProposal) {

    idText = "#" + currentProposal.proposal_id;
    titleText = (currentProposal.content.title) ? currentProposal.content.title : translatedContent.noTitle;
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
    const abstain = currentProposal.final_tally_result.abstain;
    const no = currentProposal.final_tally_result.no;
    const veto = currentProposal.final_tally_result.no_with_veto;
    const yes = currentProposal.final_tally_result.yes;
    const votesSum = Number(abstain) + Number(no) + Number(veto) + Number(yes);
    abstainTokens = (currentChain) ? tweakTokens(abstain, currentChain) : 0;
    yesTokens = (currentChain) ? tweakTokens(yes, currentChain) : 0;
    noTokens = (currentChain) ? tweakTokens(no, currentChain) : 0;
    vetoTokens = (currentChain) ? tweakTokens(veto, currentChain) : 0;
    abstainPercent = Number(abstain) / (Number(votesSum) / 100);
    noPercent = Number(no) / (votesSum / 100);
    vetoPercent = Number(veto) / (votesSum / 100);
    yesPercent = Number(yes) / (votesSum / 100);
    (isNaN(abstainPercent)) ? abstainPercent = 0 : abstainPercent = abstainPercent.toFixed(1) + "%";
    (isNaN(noPercent)) ? noPercent = 0 : noPercent = noPercent.toFixed(1) + "%";
    (isNaN(vetoPercent)) ? vetoPercent = 0 : vetoPercent = vetoPercent.toFixed(1) + "%";
    (isNaN(yesPercent)) ? yesPercent = 0 : yesPercent = yesPercent.toFixed(1) + "%";
    const description = currentProposal.content.description;
    descriptionText = (description) ? description : translatedContent.noDescription;
  }

  return (
    <div className="proposal">
      <div onClick={() => returnToProposals()} className="proposal__overlay"></div>
      <div className="proposal__card">

        {/* ШАПКА */}
        <button onClick={() => returnToProposals()} className="proposal__close-button">&#10006;</button>
        <span className="proposal__id">{idText}</span>
        <h1 className="proposal__title">{titleText}</h1>
        <div className="proposal__info">
          <div className="proposal__divider"></div>

          {/* ДАННЫЕ */}
          <div className="proposal__main-info">
            <p className="proposal__data-heading">{translatedContent.type}<span className="proposal__data">{typeText}</span></p>
            <p className="proposal__data-heading">{translatedContent.status}<span className={statusStyle}>{statusText}</span></p>
            <p className="proposal__data-heading">{translatedContent.submit}<span className="proposal__data">{submitTimeText}</span></p>
            <p className="proposal__data-heading">{translatedContent.depositEnd}<span className="proposal__data">{depositEndText}</span></p>
            <p className="proposal__data-heading">{translatedContent.deposit}<span className="proposal__data">{`${depositText} ${symbolText}`}</span></p>
            <p className="proposal__data-heading">{translatedContent.votingStart}<span className="proposal__data">{votingStartText}</span></p>
            <p className="proposal__data-heading">{translatedContent.votingEnd}<span className="proposal__data">{votingEndText}</span></p>
          </div>

          {/* ГОЛОСА */}
          <Votes proposal={currentProposal} />
          <div className="proposal__divider"></div>

          {/* ОПИСАНИЕ */}
          <div className="proposal__description">
            <span className="proposal__description-heading">{translatedContent.description}</span>
            <p className="proposal__description-text">{descriptionText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proposal;