// Пакеты
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectActiveProposals, selectCurrentChain } from "../store/reducers/currentChainSlice";



function Proposals() {

  const currentChain = useAppSelector(selectCurrentChain);
  const activeProposals = useAppSelector(selectActiveProposals);


  useEffect(() => {
    console.log(activeProposals);
  }, [currentChain])

  let activeProposalsContent;

  if (activeProposals?.length) activeProposalsContent = "there is some content"
  else activeProposalsContent = "sorry, no content"


  return (
    <div className="proposals">
      <Outlet />
      <div className="proposals__wrapper">
        <h1 className="proposals__heading">{`Active proposals on ${currentChain?.name}`}</h1>
        <div className="proposals__disclaimer"><span>Note:</span> this section is work in progress. Proposal descriptions are in markdown format, and unfortunately, each author makes it to his taste, without unified rules, which means that I not only need random library to convert it from markdown to HTML, but also have to write some complicated logic to handle every author's scenario. Maybe I'll do it later, but now proposals are presented with pretty ugly unformatted descriptions.</div>
        <div className="proposals__list">

        </div>
      </div>
    </div>
  )
}

export default Proposals;