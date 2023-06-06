// Пакеты
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Компоненты
import ProposalCard from "./ProposalCard";

// Типизация
import IProposal from "../models/IProposal";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectProposals, selectCurrentChain } from "../store/reducers/currentChainSlice";



function Proposals() {

  const currentChain = useAppSelector(selectCurrentChain);
  const proposals = useAppSelector(selectProposals);
  const [activeProposals, setActiveProposals] = useState<IProposal[] | null>(null);
  const [inactiveProposals, setInactiveProposals] = useState<IProposal[] | null>(null);

  const [shownProposals, setShownProposals] = useState<IProposal[] | null>(null);
  const [whatProposalsAreShown, setWhatProposalsAreShown] = useState<"active" | "inactive">("active");
  const noContentEl = <div className="proposals__no-content">There are no proposals yet.</div>
  const [shownContent, setShownContent] = useState<any>(noContentEl);

  // ФИЛЬТРУЕМ АКТИВНЫЕ И НЕАКТИВНЫЕ ГОЛОСОВАНИЯ
  useEffect(() => {
    const active = proposals?.filter(proposal => {
      return proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD";
    })
    const inactive = proposals?.filter(proposal => {
      return proposal.status !== "PROPOSAL_STATUS_VOTING_PERIOD";
    })
    active ? setActiveProposals(active) : setActiveProposals(null);
    inactive ? setInactiveProposals(inactive) : setInactiveProposals(null);
  }, [currentChain, proposals])

  // ОПРЕДЕЛЯЕМ, КАКИЕ ГОЛОСОВАНИЯ ПОКАЗЫВАТЬ
  useEffect(() => {
    (activeProposals && activeProposals?.length > 0)
      ? setShownProposals(activeProposals)
      : setShownProposals(null)
  }, [activeProposals, inactiveProposals])

  // РЕНДЕРИМ КОНТЕНТ В ЗАВИСИМОСТИ ОТ НАЛИЧИЯ/ОТСУТСТВИЯ ГОЛОСОВАНИЙ
  useEffect(() => {
    if (shownProposals) {
      const elements = shownProposals.map(proposal => {
        return <ProposalCard key={proposal.proposal_id} proposal={proposal} />
      })
      setShownContent(elements);
    } else {
      setShownContent(noContentEl);
    }
  }, [shownProposals])

  // ПЕРЕКЛЮЧАЕМСЯ НА АКТИВНЫЕ ГОЛОСОВАНИЯ
  const switchToActive = () => {
    setShownProposals(activeProposals);
    setWhatProposalsAreShown("active");
  }

  // ПЕРЕКЛЮЧАЕМСЯ НА НЕАКТИВНЫЕ ГОЛОСОВАНИЯ
  const switchToInactive = () => {
    setShownProposals(inactiveProposals);
    setWhatProposalsAreShown("inactive");
  }

  const activeButtonStyle = (whatProposalsAreShown === "active")
    ? "proposals__switcher-button proposals__switcher-button_selected"
    : "proposals__switcher-button"

  const inactiveButtonStyle = (whatProposalsAreShown === "active")
    ? "proposals__switcher-button"
    : "proposals__switcher-button proposals__switcher-button_selected"

  return (
    <div className="proposals">
      <Outlet />
      <div className="proposals__wrapper">
        <div className="proposals__navigation">
          <div className="proposals__switcher">
            <button onClick={switchToActive} className={activeButtonStyle}>Active</button>
            <button onClick={switchToInactive} className={inactiveButtonStyle}>Inactive</button>
          </div>
        </div>
        <div className="proposals__disclaimer"><span>Note:</span> this section is WIP. Proposal descriptions are in markdown format, and unfortunately, each author makes it to his taste, without unified rules, which means that I not only need random library to convert it from markdown to HTML, but also have to write some complicated logic to handle every author's scenario. Maybe I'll do it later, but now proposals are presented with pretty ugly unformatted descriptions - sorry for it.</div>
        <div className="proposals__list">
          {shownContent}
        </div>
      </div>
    </div>
  )
}

export default Proposals;




// function Proposals() {

//   const currentChain = useAppSelector(selectCurrentChain);
//   const proposals = useAppSelector(selectProposals);
//   const [activeProposals, setActiveProposals] = useState<IProposal[] | null>(null);
//   const [inactiveProposals, setInactiveProposals] = useState<IProposal[] | null>(null);
//   const [shownProposals, setShownProposals] = useState<IProposal[] | null>(null);
//   const [areShownProposalsActive, setAreShownProposalsActive] = useState<boolean>(true);
//   const [isProposalsHidden, setIsProposalsHidden] = useState<boolean>(false);
//   const [proposalsElements, setProposalsElements] = useState<any>(null);
//   const noContentEl = <div className="proposals__no-content">There are no proposals yet.</div>
//   const [shownContent, setShownContent] = useState<any>(noContentEl);

//   // ФИЛЬТРАЦИЯ АКТИВНЫХ И НЕАКТИВНЫХ ГОЛОСОВАНИЙ
//   useEffect(() => {
//     const active = proposals?.filter(proposal => {
//       return proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD";
//     })
//     const inactive = proposals?.filter(proposal => {
//       return proposal.status !== "PROPOSAL_STATUS_VOTING_PERIOD";
//     })
//     active ? setActiveProposals(active) : setActiveProposals(null);
//     inactive ? setInactiveProposals(inactive) : setInactiveProposals(null);
//   }, [currentChain, proposals])

//   // ПЕРЕКЛЮЧАЕМСЯ НА АКТИВНЫЕ ГОЛОСОВАНИЯ
//   const switchToActive = () => {
//     setShownProposals(activeProposals)
//     setAreShownProposalsActive(true);
//   }

//   // ПЕРЕКЛЮЧАЕМСЯ НА НЕАКТИВНЫЕ ГОЛОСОВАНИЯ
//   const switchToInactive = () => {
//     setShownProposals(inactiveProposals)
//     setAreShownProposalsActive(false);
//   }

//   const activeButtonStyle = (areShownProposalsActive)
//     ? "proposals__switcher-button proposals__switcher-button_selected"
//     : "proposals__switcher-button"

//   const inactiveButtonStyle = (areShownProposalsActive)
//     ? "proposals__switcher-button"
//     : "proposals__switcher-button proposals__switcher-button_selected"



//   useEffect(() => {
//     if (shownProposals) {
//       const elements = shownProposals.map(proposal => {
//         return <div key={proposal.proposal_id} className="proposals__proposal"></div>;
//       })
//       setProposalsElements(elements);
//       setShownContent(proposalsElements);
//     }
//   }, [currentChain, shownProposals])


//   return (
//     <div className="proposals">
//       <Outlet />
//       <div className="proposals__wrapper">
//         <div className="proposals__navigation">
//           <div className="proposals__switcher">
//             <button onClick={switchToActive} className={activeButtonStyle}>Active</button>
//             <button onClick={switchToInactive} className={inactiveButtonStyle}>Inactive</button>
//           </div>
//         </div>
//         <div className="proposals__disclaimer"><span>Note:</span> this section is work in progress. Proposal descriptions are in markdown format, and unfortunately, each author makes it to his taste, without unified rules, which means that I not only need random library to convert it from markdown to HTML, but also have to write some complicated logic to handle every author"s scenario. Maybe I"ll do it later, but now proposals are presented with pretty ugly unformatted descriptions.</div>
//         <div className="proposals__list">
//           {shownContent}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Proposals;