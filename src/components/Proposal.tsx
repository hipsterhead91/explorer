// Пакеты
import { useEffect, useState } from "react";

// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectActiveProposals, selectCurrentChain } from "../store/reducers/currentChainSlice";



function Proposal() {

  
  const currentChain = useAppSelector(selectCurrentChain);

    


  return (
    <div className="proposals">

    </div>
  )
}

export default Proposal;