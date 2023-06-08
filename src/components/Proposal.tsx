// Пакеты
import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectProposals, selectCurrentChain } from "../store/reducers/currentChainSlice";



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

  return (
    <div className="proposal">
      <button onClick={() => returnToProposals()} className="proposal__return-button"><span>&#8249;</span> Go Back</button>
      <div className="proposal__card">
        
      </div>
    </div>
  )
}

export default Proposal;