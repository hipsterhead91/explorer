// Общее
import { useState, useEffect, useRef } from "react";

// Типизация
import IValidatorsTableHeaderProps from "../models/IValidatorsTableHeaderProps";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import validatorsTableHeaderEng from "../translations/eng/validatorsTableHeaderEng";
import validatorsTableHeaderRus from "../translations/rus/validatorsTableHeaderRus";



function ValidatorsTableHeader(props: IValidatorsTableHeaderProps) {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentChain = useAppSelector(selectCurrentChain);
  const shownValidators = props.shownValidators;
  const setShownValidators = props.setShownValidators;
  const isCurrentSetActive = props.isCurrentSetActive;
  const [validatorOrder, setValidatorOrder] = useState<'ASC' | 'DSC'>('ASC');
  const [votingPowerOrder, setVotingPowerOrder] = useState<'ASC' | 'DSC'>('ASC');
  const [commissionOrder, setCommissionOrder] = useState<'ASC' | 'DSC'>('ASC');
  const validatorSortIcon = useRef<HTMLDivElement | null>(null);
  const votingPowerSortIcon = useRef<HTMLDivElement | null>(null);
  const commissionSortIcon = useRef<HTMLDivElement | null>(null);

  // СБРОС СТИЛЕЙ ИКОНОК
  const resetIconStyles = () => {
    setValidatorOrder('ASC');
    setVotingPowerOrder('ASC');
    setCommissionOrder('ASC');
    validatorSortIcon.current?.classList.remove('validators-th__sort-icon_asc');
    validatorSortIcon.current?.classList.remove('validators-th__sort-icon_dsc');
    votingPowerSortIcon.current?.classList.remove('validators-th__sort-icon_asc');
    votingPowerSortIcon.current?.classList.remove('validators-th__sort-icon_dsc');
    commissionSortIcon.current?.classList.remove('validators-th__sort-icon_asc');
    commissionSortIcon.current?.classList.remove('validators-th__sort-icon_dsc');
  }

  // СБРОС СОРТИРОВКИ
  useEffect(() => {
    resetIconStyles();
  }, [currentChain, isCurrentSetActive])

  // СОРТИРОВКА ПО МОНИКЕРУ
  /* Примечание: с помощью trim() обрезаем пробелы в начале и конце строки, а регулярное выражение убирает спецсимволы и эмодзи - всё кроме букв и цифр. */
  const sortByMoniker = () => {
    if (validatorOrder === 'ASC' && shownValidators) {
      const sorted = [...shownValidators].sort((a, b) => {
        const monikerA = a.description.moniker.trim().replace(/[^A-Za-z0-9]+/g, "");
        const monikerB = b.description.moniker.trim().replace(/[^A-Za-z0-9]+/g, "");
        return monikerA.localeCompare(monikerB);
      });
      resetIconStyles();
      setValidatorOrder('DSC');
      setShownValidators(sorted);
      validatorSortIcon.current?.classList.add('validators-th__sort-icon_asc');
    }
    else if (validatorOrder === 'DSC' && shownValidators) {
      const sorted = [...shownValidators].sort((a, b) => {
        const monikerA = a.description.moniker.trim().replace(/[^A-Za-z0-9]+/g, "");
        const monikerB = b.description.moniker.trim().replace(/[^A-Za-z0-9]+/g, "");
        return monikerB.localeCompare(monikerA);
      });
      resetIconStyles();
      setValidatorOrder('ASC');
      setShownValidators(sorted);
      validatorSortIcon.current?.classList.add('validators-th__sort-icon_dsc');
    }
  }

  // СОРТИРОВКА ПО ТОКЕНАМ
  const sortByTokens = () => {
    if (votingPowerOrder === 'ASC' && shownValidators) {
      const sorted = [...shownValidators].sort((a, b) => {
        return Number(a.tokens) > Number(b.tokens) ? 1 : -1
      });
      resetIconStyles();
      setVotingPowerOrder('DSC');
      setShownValidators(sorted);
      votingPowerSortIcon.current?.classList.add('validators-th__sort-icon_asc');
    }
    else if (votingPowerOrder === 'DSC' && shownValidators) {
      const sorted = [...shownValidators].sort((a, b) => {
        return Number(a.tokens) < Number(b.tokens) ? 1 : -1
      });
      resetIconStyles();
      setVotingPowerOrder('ASC');
      setShownValidators(sorted);
      votingPowerSortIcon.current?.classList.add('validators-th__sort-icon_dsc');
    }
  }

  // СОРТИРОВКА ПО КОМИССИИ
  const sortByCommission = () => {
    if (commissionOrder === 'ASC' && shownValidators) {
      const sorted = [...shownValidators].sort((a, b) => {
        return Number(a.commission.commission_rates.rate) > Number(b.commission.commission_rates.rate) ? 1 : -1
      });
      resetIconStyles();
      setCommissionOrder('DSC');
      setShownValidators(sorted);
      commissionSortIcon.current?.classList.add('validators-th__sort-icon_asc');
    }
    else if (commissionOrder === 'DSC' && shownValidators) {
      const sorted = [...shownValidators].sort((a, b) => {
        return Number(a.commission.commission_rates.rate) < Number(b.commission.commission_rates.rate) ? 1 : -1
      });
      resetIconStyles();
      setCommissionOrder('ASC');
      setShownValidators(sorted);
      commissionSortIcon.current?.classList.add('validators-th__sort-icon_dsc');
    }
  }

  // ЛОКАЛИЗАЦИЯ
  const translatedContent = (currentLanguage == "english") ? validatorsTableHeaderEng : validatorsTableHeaderRus;

  return (
    <div className="validators-th">

      {/* МОНИКЕР */}
      <div id="th-validator" className="validators-th__cell">
        <div onClick={() => sortByMoniker()} id="srt-validator" className="validators-th__sort-button">
          <span className="validators-th__column-name">{translatedContent.moniker}</span>
          <div ref={validatorSortIcon} className="validators-th__sort-icon">
            <span className="validators-th__sort-icon-asc"></span>
            <span className="validators-th__sort-icon-dsc"></span>
          </div>
        </div>
      </div>

      {/* ВЕС ГОЛОСА */}
      <div id="th-power" className="validators-th__cell">
        <div onClick={() => sortByTokens()} id="srt-power" className="validators-th__sort-button">
          <span className="validators-th__column-name">{translatedContent.votingPower}</span>
          <div ref={votingPowerSortIcon} className="validators-th__sort-icon">
            <span className="validators-th__sort-icon-asc"></span>
            <span className="validators-th__sort-icon-dsc"></span>
          </div>
        </div>
      </div>

      {/* КОМИССИЯ */}
      <div id="th-commission" className="validators-th__cell">
        <div onClick={() => sortByCommission()} id="srt-commission" className="validators-th__sort-button">
          <span className="validators-th__column-name">{translatedContent.commission}</span>
          <div ref={commissionSortIcon} className="validators-th__sort-icon">
            <span className="validators-th__sort-icon-asc"></span>
            <span className="validators-th__sort-icon-dsc"></span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ValidatorsTableHeader;