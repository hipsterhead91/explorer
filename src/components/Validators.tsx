import { useState, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCurrentChain, selectValidators, selectTotalBonded, setAvatarsData, selectAvatarsData, setValidators } from "../store/reducers/currentChainSlice";
import ValidatorsTableHeader from "./ValidatorsTableHeader";
import ValidatorsTableRow from "./ValidatorsTableRow";
import getAvatarsData from "../services/getAvatarsData";
import IAvatarData from "../models/IAvatarData";
import { addAvatars, addRanks, addVotingPower, filterActive, filterInactive, sortByTokens } from "../utils/formatting";

function Validators() {

  const currentChain = useAppSelector(selectCurrentChain);
  const totalBonded = useAppSelector(selectTotalBonded);
  const validators = useAppSelector(selectValidators);
  const avatarsData = useAppSelector(selectAvatarsData);
  const dispatch = useAppDispatch();

  const [activeValidators, setActiveValidators] = useState<any>();
  const [inactiveValidators, setInactiveValidators] = useState<any>();
  const [shownValidators, setShownValidators] = useState<any>();
  const [shownValidatorsBackup, setShownValidatorsBackup] = useState<any>(); // нужен для отката после фильтраций
  const [isCurrentSetActive, setIsCurrentSetActive] = useState<boolean>(true);
  const filterInput = useRef();

  const heading = (currentChain === null) ? '' : currentChain.isMainnet ? currentChain.name : `${currentChain.name} Testnet`;
  const subheading = (currentChain === null) ? '' : `${currentChain.isMainnet ? 'mainnet' : 'testnet'} · ${currentChain.chainId}`;

  useEffect(() => {
    if (currentChain) {
      getAvatarsData(currentChain)
        .then(result => dispatch(setAvatarsData(result)))
    }
  }, [currentChain])

  // Примечание: почему такие сложные махинации? Потому что у неактивного валидатора может быть больше токенов, чем у активного,
  // и если их упорядочивать сразу, не разделяя, то может получиться, что активные и неактивные будут идти вперемешку, а должны 
  // быть сначала все активные, и только после них неактивные. Таким образом, сейчас, даже если у некоего неактивного валидатора
  // самый огромный стейк в сети, по рейтингу он всё равно будет стоять только после самого "нищего" активного. Короче, всё
  // правильно, доверься.
  useEffect(() => {
    if (validators && totalBonded && avatarsData) {
      let active = filterActive(validators);
      let inactive = filterInactive(validators);
      active = sortByTokens(active);
      inactive = sortByTokens(inactive);
      let all = active.concat(inactive);
      all = addRanks(all);
      all = addVotingPower(all, totalBonded);
      all = addAvatars(all, avatarsData);
      dispatch(setValidators(all));
      active = filterActive(all);
      inactive = filterInactive(all);
      setActiveValidators(active);
      setInactiveValidators(inactive);
    }
  }, [totalBonded, avatarsData])

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
    // filterInput.current.value = '';
  }, [currentChain, isCurrentSetActive])

  // ПЕРЕКЛЮЧАЕМСЯ НА АКТИВНЫЙ СЕТ
  const switchToActive = () => {
    setShownValidators(activeValidators);
    setShownValidatorsBackup(activeValidators);
    setIsCurrentSetActive(true);
    console.log(shownValidators);

  }

  // ПЕРЕКЛЮЧАЕМСЯ НА НЕАКТИВНЫЙ СЕТ
  const switchToInactive = () => {
    setShownValidators(inactiveValidators);
    setShownValidatorsBackup(inactiveValidators);
    setIsCurrentSetActive(false);
    console.log(shownValidators);
  }

  const activeButtonStyle = isCurrentSetActive ? "validators__switcher-button validators__switcher-button_selected" : "validators__switcher-button"
  const inactiveButtonStyle = isCurrentSetActive ? "validators__switcher-button" : "validators__switcher-button validators__switcher-button_selected"

  return (
    <div className="validators">
      <div className="validators__container">
        <div className="validators__header">
          <h1>{heading}</h1>
          <span>{subheading}</span>
        </div>
        <div className="validators__navigation">
          <div className="validators__switcher">
            <button onClick={switchToActive} className={activeButtonStyle}>Active</button>
            <button onClick={switchToInactive} className={inactiveButtonStyle}>Inactive</button>
          </div>
          <div className="validators__find">
            <input className="validators__find-input" type="text" placeholder="Search by moniker"></input>
            <button className="validators__find-button">Clear</button>
          </div>
        </div>
        <div className="validators__table">
          <ValidatorsTableHeader />
          <div className="validators__rows">
            {validators?.map(validator => {
              return <ValidatorsTableRow key={validator.operator_address} validator={validator} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Validators;