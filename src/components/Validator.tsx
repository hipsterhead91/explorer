// Общее
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Типизация
import IValidator from "../models/IValidator";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectAvatars, selectCurrentChain, selectTotalBonded, selectValidators } from "../store/reducers/currentChainSlice";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализация
import validatorEng from "../translations/eng/validatorEng";
import validatorRus from "../translations/rus/validatorRus";

// Прочее
import { tweakTokens, tweakCommission, addVotingPower, addAvatars } from "../utils/formatting";



function Validator() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentValoper = useParams()["valoper"]; // из ссылки в браузерной строке получаем адрес текущего валидатора
  const currentChain = useAppSelector(selectCurrentChain);
  const rawValidators = useAppSelector(selectValidators);
  const rawTotalBonded = useAppSelector(selectTotalBonded);
  const rawAvatars = useAppSelector(selectAvatars);
  const [tweakedValidators, setTweakedValidators] = useState<IValidator[] | null>(null);
  const [currentValidator, setCurrentValidator] = useState<IValidator | null>();
  const validatorElement = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // ФОРМАТИРУЕМ ВАЛИДАТОРОВ
  useEffect(() => {
    if (rawValidators && rawTotalBonded && rawAvatars) {
      /* Глубоко копируем массив, чтобы объектам в нём можно было добавлять новые свойства.  */
      let validators = JSON.parse(JSON.stringify(rawValidators));
      validators = addVotingPower(validators, rawTotalBonded);
      validators = addAvatars(validators, rawAvatars);
      setTweakedValidators(validators);
    }
  }, [rawValidators, rawTotalBonded, rawAvatars])

  // ВОЗВРАТ К ТАБЛИЦЕ ВАЛИДАТОРОВ
  const returnToValidators = () => {
    navigate(`/${currentChain?.chainId}/validators`);
  }

  // ЕСЛИ ВАЛИДАТОРА НЕ СУЩЕСТВУЕТ, ВОЗВРАЩАЕМСЯ В ТАБЛИЦУ
  useEffect(() => {
    if (rawValidators && currentValoper) {
      const doesExist = rawValidators.find(validator => validator.operator_address == currentValoper);
      if (doesExist) validatorElement.current?.classList.remove("validator_hidden")
      else {
        validatorElement.current?.classList.add("validator_hidden");
        returnToValidators();
      }
    }
  }, [rawValidators, currentValoper])

  // ЗАКРЫТИЕ ПО КЛАВИШЕ ESCAPE
  const closeByEscapeButton = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      returnToValidators();
    }
  };

  // СЛУШАЕМ ESCAPE
  useEffect(() => {
    document.addEventListener('keydown', closeByEscapeButton);
    return () => document.removeEventListener('keydown', closeByEscapeButton);
  }, []);

  // ОТКЛЮЧАЕМ СКРОЛЛ КОНТЕНТА ПОД МОДАЛЬНЫМ ОКНОМ
  useEffect(() => {
    document.body.classList.add("noScroll");
    return () => { document.body.classList.remove("noScroll") };
  }, []);

  // ПОЛУЧАЕМ ОБЪЕКТ ТЕКУЩЕГО ВАЛИДАТОРА
  useEffect(() => {
    const validator = tweakedValidators?.find((val: { operator_address: string }) => val.operator_address === currentValoper);
    if (validator) setCurrentValidator(validator);
    else setCurrentValidator(null);
  }, [currentValoper, currentChain, tweakedValidators])

  // АВАТАР
  const avatarUrl =
    (currentValidator?.avatar)
      ? currentValidator.avatar
      : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

  // РАНГ
  const rankText =
    (currentValidator?.rank)
      ? "#" + currentValidator.rank.toString().padStart(3, '0')
      : "#000";

  // МОНИКЕР
  const monikerText =
    (currentValidator)
      ? currentValidator.description.moniker
      : "This validator doesn't exist";

  // ВАЛОПЕР
  const valoperText =
    (currentValidator)
      ? currentValidator.operator_address
      : "no validator operator address";

  // СТАТУС АКТИВНОСТИ
  const activityText =
    (currentValidator?.status === "BOND_STATUS_BONDED")
      ? "Active"
      : "Inactive";

  const activityStyle =
    (currentValidator?.status === "BOND_STATUS_BONDED")
      ? "validator__status validator__status_good"
      : "validator__status validator__status_neutral";

  // СТАТУС БОНДА
  const bondText =
    (currentValidator?.status === 'BOND_STATUS_BONDED')
      ? "Bonded"
      : (currentValidator?.status === 'BOND_STATUS_UNBONDING')
        ? "Unbonding"
        : "Unbonded";

  const bondStyle =
    (currentValidator?.status === 'BOND_STATUS_BONDED')
      ? "validator__status validator__status_good"
      : (currentValidator?.status === 'BOND_STATUS_UNBONDING')
        ? "validator__status validator__status_special"
        : "validator__status validator__status_neutral";

  // СТАТУС ТЮРЬМЫ
  const jailText = (currentValidator?.jailed) ? "Jailed" : "";
  const jailStyle =
    (currentValidator?.jailed)
      ? "validator__status validator__status_bad"
      : "validator__status validator__status_hidden";

  // СТАТУС ВЫСОКОЙ КОМИССИИ
  const highCommissionText =
    (Number(currentValidator?.commission.commission_rates.rate) > 0.1)
      ? "High %"
      : "";

  const highCommissionStyle =
    (Number(currentValidator?.commission.commission_rates.rate) > 0.1)
      ? "validator__status validator__status_hidden"
      : "";

  // КОМИССИЯ
  const commissionText =
    (currentValidator)
      ? tweakCommission(currentValidator.commission.commission_rates.rate) + '%'
      : "—";

  const commissionStyle =
    (Number(currentValidator?.commission.commission_rates.rate) > 0.1)
      ? "validator__commission-value validator__commission-value_high"
      : "validator__commission-value";

  // ТОКЕНЫ
  const symbolText = (currentChain && currentValidator) ? currentChain.symbol : "";
  const tokensText =
    (currentChain && currentValidator)
      ? tweakTokens(currentValidator.tokens, currentChain)
      : "—";

  // ВЕС ГОЛОСА
  const votingPowerText = (currentValidator?.voting_power && currentChain)
    ? currentValidator.voting_power + '%'
    : "—";

  // САЙТ
  const websiteText =
    (currentValidator?.description.website)
      ? currentValidator.description.website
      : "—";

  // КОНТАКТ
  const securityContactText =
    (currentValidator?.description.security_contact)
      ? currentValidator.description.security_contact
      : "—";

  // ДЕТАЛИ
  const detailsText =
    (currentValidator?.description.details)
      ? currentValidator.description.details
      : "—";


  // ЛОКАЛИЗАЦИЯ
  const translatedContent = (currentLanguage == "english") ? validatorEng : validatorRus;

  return (
    <div ref={validatorElement} className="validator validator_hidden">

      <div onClick={() => returnToValidators()} className="validator__overlay"></div>

      <div className="validator__card">
        <button onClick={() => returnToValidators()} className="validator__close-button">&#10006;</button>

        <div className="validator__grid">

          <div className="validator__avatar" style={{ backgroundImage: `url("${avatarUrl}")` }}></div>

          <div className="validator__heading">
            <div className="validator__main-info">
              <span className="validator__rank">{rankText}</span>
              <h1 className="validator__moniker">{monikerText}</h1>
            </div>
            <p className="validator__valoper">{valoperText}</p>
            <div className="validator__statuses">
              <span className={activityStyle}>{activityText}</span>
              <span className={bondStyle}>{bondText}</span>
              <span className={jailStyle}>{jailText}</span>
              <span className={highCommissionStyle}>{highCommissionText}</span>
            </div>
          </div>

          <div className="validator__data">
            <p className="validator__data-heading">{translatedContent.tokens}</p>
            <span className="validator__data-text">{tokensText}<span className="validator__denom">{symbolText}</span></span>
            <p className="validator__data-heading">{translatedContent.votingPower}</p>
            <span className="validator__data-text">{votingPowerText}</span>
            <p className="validator__data-heading">{translatedContent.commission}</p>
            <span className={commissionStyle}>{commissionText}</span>
            <p className="validator__data-heading">{translatedContent.website}</p>
            <span className="validator__data-text">{websiteText}</span>
            <p className="validator__data-heading">{translatedContent.contact}</p>
            <span className="validator__data-text">{securityContactText}</span>
            <p className="validator__data-heading">{translatedContent.details}</p>
            <span className="validator__data-text">{detailsText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Validator;