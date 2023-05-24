// Пакеты
import { useState, useEffect, useRef } from "react";

// Компоненты
import ChainHeading from "./ChainHeading";
import ValidatorsTableHeader from "./ValidatorsTableHeader";
import ValidatorsTableRow from "./ValidatorsTableRow";

// Типизация
import IValidator from "../models/IValidator";

// Redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCurrentChain, selectValidators } from "../store/reducers/currentChainSlice";

// Прочее
import { filterActive, filterInactive } from "../utils/formatting";



function Validators() {

  const dispatch = useAppDispatch();
  const currentChain = useAppSelector(selectCurrentChain);
  const validators = useAppSelector(selectValidators);
  const [activeValidators, setActiveValidators] = useState<IValidator[] | null>(null);
  const [inactiveValidators, setInactiveValidators] = useState<IValidator[] | null>(null);
  const [shownValidators, setShownValidators] = useState<IValidator[] | null>(null);
  const [shownValidatorsBackup, setShownValidatorsBackup] = useState<IValidator[] | null>(null);
  const [isCurrentSetActive, setIsCurrentSetActive] = useState<boolean>(true);
  const filterInput = useRef();

  // ДЕЛИМ ВАЛИДАТОРОВ НА АКТИВНЫХ И НЕАКТИВНЫХ
  useEffect(() => {
    if (validators) {
      setActiveValidators(filterActive(validators));
      setInactiveValidators(filterInactive(validators));
    }
  }, [currentChain, validators])

  // РЕНДЕРИМ АКТИВНЫХ ВАЛИДАТОРОВ КОГДА ОНИ ПОЛУЧЕНЫ
  useEffect(() => {
    setShownValidators(activeValidators);
    setShownValidatorsBackup(activeValidators);
  }, [activeValidators])

  // СБРАСЫВАЕМ НАСТРОЙКИ ПРИ ПЕРЕКЛЮЧЕНИИ СЕТИ
  useEffect(() => {
    setIsCurrentSetActive(true);
  }, [currentChain])

  // СБРАСЫВАЕМ ИНПУТ ФИЛЬТРА ВАЛИДАТОРОВ
  useEffect(() => {

  }, [currentChain, isCurrentSetActive])

  // ПЕРЕКЛЮЧАЕМСЯ НА АКТИВНЫЙ СЕТ
  const switchToActive = () => {
    setShownValidators(activeValidators);
    setShownValidatorsBackup(activeValidators);
    setIsCurrentSetActive(true);
  }

  // ПЕРЕКЛЮЧАЕМСЯ НА НЕАКТИВНЫЙ СЕТ
  const switchToInactive = () => {
    setShownValidators(inactiveValidators);
    setShownValidatorsBackup(inactiveValidators);
    setIsCurrentSetActive(false);
  }

  const activeButtonStyle = (isCurrentSetActive)
    ? "validators__switcher-button validators__switcher-button_selected"
    : "validators__switcher-button"

  const inactiveButtonStyle = (isCurrentSetActive)
    ? "validators__switcher-button"
    : "validators__switcher-button validators__switcher-button_selected"

  return (
    <div className="validators">
      <ChainHeading />
      <div className="validators__navigation">
        <div className="validators__switcher">
          <button onClick={switchToActive} className={activeButtonStyle}>Active</button>
          <button onClick={switchToInactive} className={inactiveButtonStyle}>Inactive</button>
        </div>
        <div className="validators__search">
          <input className="validators__search-input" type="text" placeholder="Search by moniker"></input>
          <button className="validators__search-button">Clear</button>
        </div>
      </div>
      <div className="validators__table">
        <ValidatorsTableHeader />
        <div className="validators__table-rows">
          {shownValidators?.map(validator => {
            return <ValidatorsTableRow key={validator.operator_address} validator={validator} />
          })}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="validators">
  //     <div className="validators__container">
  //       <div className="validators__header">
  //         <h1>{heading}</h1>
  //         <span>{subheading}</span>
  //       </div>
  //       <div className="validators__navigation">
  //         <div className="validators__switcher">
  //           <button onClick={switchToActive} className={activeButtonStyle}>Active</button>
  //           <button onClick={switchToInactive} className={inactiveButtonStyle}>Inactive</button>
  //         </div>
  //         <div className="validators__find">
  //           <input className="validators__find-input" type="text" placeholder="Search by moniker"></input>
  //           <button className="validators__find-button">Clear</button>
  //         </div>
  //       </div>
  //       <div className="validators__table">
  //         <ValidatorsTableHeader />
  //         <div className="validators__rows">
  //           {shownValidators?.map(validator => {
  //             return <ValidatorsTableRow key={validator.operator_address} validator={validator} />
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default Validators;