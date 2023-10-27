// Пакеты
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Компоненты
import ValidatorsTableHeader from "./ValidatorsTableHeader";
import ValidatorsTableRow from "./ValidatorsTableRow";

// Типизация
import IValidator from "../models/IValidator";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain, selectValidators } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Прочее
import { filterActive, filterInactive } from "../utils/formatting";



function Validators() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const validators = useAppSelector(selectValidators);
  const [activeValidators, setActiveValidators] = useState<IValidator[] | null>(null);
  const [inactiveValidators, setInactiveValidators] = useState<IValidator[] | null>(null);
  const [shownValidators, setShownValidators] = useState<IValidator[] | null>(null);
  const [shownValidatorsBackup, setShownValidatorsBackup] = useState<IValidator[] | null>(null);
  const [isCurrentSetActive, setIsCurrentSetActive] = useState<boolean>(true);
  /* Если я всё правильно понял, при использовании хука useRef нужно указывать тип элемента, который ему присваивается, и null как "стартовый" тип, поскольку ref инициализируется ДО рендера, т.е. тогда, когда искомого элемента ещё нет. При этом, обращаясь к элементу через element.current, мы будем получать ошибку, мол элемент возможно равен null - чтобы этого избежать, используем оператор состояния ? после каждого current. */
  const validatorsWrapper = useRef<HTMLDivElement | null>(null);
  const filterInput = useRef<HTMLInputElement | null>(null);
  const scrollButtons = useRef<HTMLDivElement>(null);

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
    if (filterInput.current) filterInput.current.value = '';
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

  // СТИЛИ ПЕРЕКЛЮЧАТЕЛЯ
  const activeButtonStyle = (isCurrentSetActive)
    ? "validators__switcher-button validators__switcher-button_selected"
    : "validators__switcher-button"

  const inactiveButtonStyle = (isCurrentSetActive)
    ? "validators__switcher-button"
    : "validators__switcher-button validators__switcher-button_selected"

  // СКРОЛЛИМ СТРАНИЦУ ВВЕРХ
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // СКРОЛЛИМ СТРАНИЦУ ВНИЗ
  const scrollToBottom = () => {
    window.scrollTo({
      top: 99999999,
      behavior: "smooth"
    });
  }

  // ЗАГЛУШКА, ЕСЛИ ВАЛИДАТОРЫ НЕ ПОЛУЧЕНЫ
  let noValidatorsPlaceholder;
  if (currentLanguage == "eng") {
    noValidatorsPlaceholder = <div className="validators__placeholder">
      <p className="validators__placeholder-text-top">Validators are loading or unavailable now.</p>
      <p className="validators__placeholder-text-bottom">If it lasts too long, you may try to refresh this page (<span>press F5</span>).</p>
    </div>
  } else if (currentLanguage == "rus") {
    noValidatorsPlaceholder = <div className="validators__placeholder">
      <p className="validators__placeholder-text-top">Валидаторы грузятся, либо недоступны в данный момент.</p>
      <p className="validators__placeholder-text-bottom">Если это длится слишком долго, попробуйте обновить страницу (<span>нажмите F5</span>).</p>
    </div>
  }

  // ЗАГЛУШКА ЕСЛИ ПО ЗАПРОСУ В ИНПУТЕ НИЧЕГО НЕ НАЙДЕНО
  let currentSet, nothingFoundPlaceholder;
  if (isCurrentSetActive && currentLanguage == "eng") currentSet = "active";
  if (!isCurrentSetActive && currentLanguage == "eng") currentSet = "inactive";
  if (isCurrentSetActive && currentLanguage == "rus") currentSet = "активный";
  if (!isCurrentSetActive && currentLanguage == "rus") currentSet = "неактивный";

  if (currentLanguage == "eng") {
    nothingFoundPlaceholder = <div className="validators__placeholder">
      <p className="validators__placeholder-text-top"><span>Oops!</span> Nothing found.</p>
      <p className="validators__placeholder-text-bottom">There is no <span>{currentSet}</span> validator containing <span>"{filterInput.current?.value}"</span> in its moniker.</p>
    </div>
  } else if (currentLanguage == "rus") {
    nothingFoundPlaceholder = <div className="validators__placeholder">
      <p className="validators__placeholder-text-top"><span>Упс!</span> Ничего не нашлось.</p>
      <p className="validators__placeholder-text-bottom">Ни один <span>{currentSet}</span> валидатор не содержит <span>"{filterInput.current?.value}"</span> в своём моникере.</p>
    </div>
  }

  // РЕНДЕР КОНТЕНТА В ТАБЛИЦЕ
  let tableContent;
  if (!validators) tableContent = noValidatorsPlaceholder;
  if (validators) tableContent = shownValidators?.map(validator => {
    return <ValidatorsTableRow key={validator.operator_address} validator={validator} />
  })
  if (validators && !shownValidators?.length && filterInput.current?.value) tableContent = nothingFoundPlaceholder;

  let activeText, inactiveText, clearText, inputPlaceholderText;

  if (currentLanguage == "eng") {
    activeText = "Active";
    inactiveText = "Inactive";
    clearText = "Clear";
    inputPlaceholderText = "search by moniker";
  } else if (currentLanguage == "rus") {
    activeText = "Активные";
    inactiveText = "Неактивные";
    clearText = "Сброс";
    inputPlaceholderText = "искать по моникеру";
  }

  return (
    <div className="validators">
      <Outlet />
      <div ref={validatorsWrapper} className="validators__wrapper">
        <div className="validators__navigation">
          <div className="validators__switcher">
            <button onClick={switchToActive} className={activeButtonStyle}>{activeText}</button>
            <button onClick={switchToInactive} className={inactiveButtonStyle}>{inactiveText}</button>
          </div>
          <div className="validators__search">
            <input ref={filterInput} onChange={event => filterByMoniker(event)} className="validators__search-input" type="text" placeholder={inputPlaceholderText}></input>
            <button onClick={clearFilter} className="validators__search-button">{clearText}</button>
          </div>
        </div>
        <div className="validators__table">
          <ValidatorsTableHeader shownValidators={shownValidators} setShownValidators={setShownValidators} isCurrentSetActive={isCurrentSetActive} />
          <div className="validators__table-rows">{tableContent}</div>
        </div>
      </div>
      <div ref={scrollButtons} className="validators__scroll-buttons">
        <button onClick={scrollToTop} className="validators__scroll-button validators__scroll-button_top">
          <div className="validators__scroll-arrow validators__scroll-arrow_top"></div>
        </button>
        <button onClick={scrollToBottom} className="validators__scroll-button validators__scroll-button_bottom">
          <div className="validators__scroll-arrow validators__scroll-arrow_bottom"></div>
        </button>
      </div>
    </div>
  );
}

export default Validators;