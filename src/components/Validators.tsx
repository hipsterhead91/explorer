// Пакеты
import { useState, useEffect, useRef } from "react";

// Компоненты
import ChainHeading from "./ChainHeading";
import ValidatorsTableHeader from "./ValidatorsTableHeader";
import ValidatorsTableRow from "./ValidatorsTableRow";

// Типизация
import IValidator from "../models/IValidator";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain, selectValidators } from "../store/reducers/currentChainSlice";

// Прочее
import { filterActive, filterInactive } from "../utils/formatting";



function Validators() {

  const currentChain = useAppSelector(selectCurrentChain);
  const validators = useAppSelector(selectValidators);
  const [activeValidators, setActiveValidators] = useState<IValidator[] | null>(null);
  const [inactiveValidators, setInactiveValidators] = useState<IValidator[] | null>(null);
  const [shownValidators, setShownValidators] = useState<IValidator[] | null>(null);
  const [shownValidatorsBackup, setShownValidatorsBackup] = useState<IValidator[] | null>(null);
  const [isCurrentSetActive, setIsCurrentSetActive] = useState<boolean>(true);
  /* Если я всё правильно понял, при использовании хука useRef нужно указывать тип элемента, который ему присваивается, и null как "стартовый" тип, поскольку ref инициализируется ДО рендера, т.е. тогда, когда искомого элемента ещё нет. При этом, обращаясь к элементу через element.current, мы будем получать ошибку, мол элемент возможно равен null - чтобы этого избежать, используем оператор состояния ? после каждого current. */
  const filterInput = useRef<HTMLInputElement | null>(null);

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

  // ФИЛЬТРУЕМ ВАЛИДАТОРОВ ПО МОНИКЕРУ
  const filterByMoniker = (event: { target: { value: string } }) => {
    const value = event.target.value.toLowerCase();
    const filtered = shownValidatorsBackup?.filter(validator => {
      return validator.description.moniker.toLowerCase().includes(value);
    });
    if (filtered) setShownValidators(filtered);
  }

  // СБРАСЫВАЕМ ФИЛЬТР
  const clearFilter = () => {
    if (filterInput.current) {
      setShownValidators(shownValidatorsBackup);
      filterInput.current.value = '';
    }
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
          <input ref={filterInput} onChange={event => filterByMoniker(event)} className="validators__search-input" type="text" placeholder="Search by moniker"></input>
          <button onClick={clearFilter} className="validators__search-button">Clear</button>
        </div>
      </div>
      <div className="validators__table">
        <ValidatorsTableHeader shownValidators={shownValidators} setShownValidators={setShownValidators} isCurrentSetActive={isCurrentSetActive} />
        <div className="validators__table-rows">
          {shownValidators?.map(validator => {
            return <ValidatorsTableRow key={validator.operator_address} validator={validator} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Validators;