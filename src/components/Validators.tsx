// Пакеты
import { useState, useEffect, useRef } from "react";
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

// Локализации
import validatorsEng from "../translations/eng/validatorsEng";
import validatorsRus from "../translations/rus/validatorsRus";

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

  // СКРЫВАЕМ КНОПКИ СКРОЛЛА В ЗАВИСИМОСТИ ОТ ВЫСОТЫ СТРАНИЦЫ
  useEffect(() => {
    if (document.body.clientHeight > window.innerHeight) {
      scrollButtons.current?.classList.remove("validators__scroll-buttons_hidden");
    } else {
      scrollButtons.current?.classList.add("validators__scroll-buttons_hidden");
    }
  }, [shownValidators])

  // ЛОКАЛИЗАЦИЯ И РЕНДЕР КОНТЕНТА В ТАБЛИЦЕ
  let tableContent;
  let translatedContent = validatorsEng;
  if (currentLanguage == "eng") translatedContent = validatorsEng;
  if (currentLanguage == "rus") translatedContent = validatorsRus;
  if (!validators) tableContent = translatedContent.noValidatorsPlaceholder;
  if (validators) tableContent = shownValidators?.map(validator => {
    return <ValidatorsTableRow key={validator.operator_address} validator={validator} />
  })
  if (validators && !shownValidators?.length && filterInput.current?.value) tableContent = translatedContent.nothingFoundPlaceholder;

  return (
    <div className="validators">
      <Outlet />
      <div ref={validatorsWrapper} className="validators__wrapper">
        <div className="validators__navigation">
          <div className="validators__switcher">
            <button onClick={switchToActive} className={activeButtonStyle}>{translatedContent.active}</button>
            <button onClick={switchToInactive} className={inactiveButtonStyle}>{translatedContent.inactive}</button>
          </div>
          <div className="validators__search">
            <input ref={filterInput} onChange={event => filterByMoniker(event)} className="validators__search-input" type="text" placeholder={translatedContent.inputPlaceholder}></input>
            <button onClick={clearFilter} className="validators__clear-button">{translatedContent.clear}</button>
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