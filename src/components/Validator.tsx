// Пакеты
import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

// Типизация
import IValidator from "../models/IValidator";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain, selectValidators } from "../store/reducers/currentChainSlice";

// Прочее
import { tweakTokens, tweakVotingPower, tweakCommission } from "../utils/formatting";



function Validator() {

  const currentValoper = useParams()["valoper"]; // из ссылки в браузерной строке получаем адрес текущего валидатора
  const currentChain = useAppSelector(selectCurrentChain);
  const validators = useAppSelector(selectValidators);
  const [currentValidator, setCurrentValidator] = useState<IValidator | null>();
  const navigate = useNavigate();

  const setIsValidatorsHidden = useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  // ПРИ ОТКРЫТИИ КОМПОНЕНТА СКРЫВАЕМ ТАБЛИЦУ ВАЛИДАТОРОВ
  useEffect(() => {
    setIsValidatorsHidden(true);
  }, [])

  // ВОЗВРАТ К ТАБЛИЦЕ ВАЛИДАТОРОВ
  const returnToValidators = () => {
    navigate(`/${currentChain?.chainId}/validators`);
    setIsValidatorsHidden(false);
  }

  // ПОЛУЧАЕМ ОБЪЕКТ ТЕКУЩЕГО ВАЛИДАТОРА
  useEffect(() => {
    const validator = validators?.find((val: { operator_address: string }) => val.operator_address === currentValoper);
    if (validator) setCurrentValidator(validator);
    else setCurrentValidator(null);
  }, [currentValoper, currentChain, validators])

  // АВАТАР
  const avatarUrl = (currentValidator?.avatar)
    ? currentValidator.avatar
    : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

  // РЕЙТИНГ
  const rank = '#' + currentValidator?.rank?.toString().padStart(3, '0');

  // МОНИКЕР
  const moniker = currentValidator?.description.moniker;

  // ВАЛОПЕР
  const valoper = currentValidator?.operator_address;

  // АКТИВНОСТЬ
  const activityText = (currentValidator?.status === 'BOND_STATUS_BONDED')
    ? 'Active'
    : 'Inactive';

  const activityStyle = (currentValidator?.status === 'BOND_STATUS_BONDED')
    ? 'validator__status validator__status_good'
    : 'validator__status validator__status_neutral';

  // БОНД
  const bondText =
    (currentValidator?.status === 'BOND_STATUS_BONDED')
      ? 'Bonded'
      : (currentValidator?.status === 'BOND_STATUS_UNBONDED')
        ? 'Unbonded'
        : (currentValidator?.status === 'BOND_STATUS_UNBONDING')
          ? 'Unbonding'
          : '';

  const bondStyle =
    (currentValidator?.status === 'BOND_STATUS_BONDED')
      ? 'validator__status validator__status_good'
      : (currentValidator?.status === 'BOND_STATUS_UNBONDED')
        ? 'validator__status validator__status_neutral'
        : (currentValidator?.status === 'BOND_STATUS_UNBONDING')
          ? 'validator__status validator__status_special'
          : '';

  // ТЮРЬМА
  const jailText = (currentValidator?.jailed) ? 'Jailed' : '';
  const jailStyle = (currentValidator?.jailed)
    ? 'validator__status validator__status_bad'
    : 'validator__status validator__status_hidden';

  // ВЫСОКАЯ КОМИССИЯ
  const highCommissionText = (Number(currentValidator?.commission.commission_rates.rate) > 0.1)
    ? 'High %'
    : '';

  const highCommissionStyle = (Number(currentValidator?.commission.commission_rates.rate) > 0.1)
    ? 'validator__status validator__status_bad'
    : 'validator__status validator__status_hidden';


  // РЕНДЕР ВЕСА ГОЛОСА
  const stake = (currentChain && currentValidator)
    ? tweakTokens(currentValidator.tokens, currentChain)
    : '';
  const symbol = currentChain?.symbol;
  const votingPower = (currentChain && currentValidator?.voting_power)
    ? tweakVotingPower(currentValidator.voting_power, currentChain) + '%'
    : '';

  // РЕНДЕР КОМИССИИ
  const commissionText = (currentValidator)
    ? tweakCommission(currentValidator.commission.commission_rates.rate) + '%'
    : '';

  const commissionStyle = (currentValidator && Number(currentValidator.commission.commission_rates.rate) > 0.1)
    ? 'validator__commission-value validator__commission-value_high'
    : 'validator__commission-value';

  // РЕНДЕР ВЕБСАЙТА
  const website = (currentValidator?.description.website === '')
    ? <p className="validator__data-text">—</p>
    : <a className="validator__data-link" href={currentValidator?.description.website} target="_blank">{currentValidator?.description.website}</a>

  // РЕНДЕР БЕЗОПАСНОГО КОНТАКТА
  const securityContact = (currentValidator?.description.security_contact === '') ? '—' : currentValidator?.description.security_contact;

  // РЕНДЕР ОПИСАНИЯ
  const details = (currentValidator?.description.details === '') ? '—' : currentValidator?.description.details;




  return (
    <div className="validator">
      <button onClick={() => returnToValidators()} className="validator__return-button">&#9664; Return</button>
      <div className="validator__card">

        {/* ВЕРХНИЙ ЛЕВЫЙ */}
        <div className="validator__avatar" style={{ backgroundImage: `url("${avatarUrl}")` }}></div>

        {/* ВЕРХНИЙ ПРАВЫЙ */}
        <div className="validator__heading">
          <h1 className="validator__moniker">{moniker}</h1>
          <p className="validator__valoper">{valoper}</p>
          <div className="validator__statuses">
            <span className={activityStyle}>{activityText}</span>
            <span className={bondStyle}>{bondText}</span>
            <span className={jailStyle}>{jailText}</span>
            <span className={highCommissionStyle}>{highCommissionText}</span>
          </div>
        </div>

        {/* НИЖНИЙ ЛЕВЫЙ */}
        <span className="validator__rank">{rank}</span>

        {/* НИЖНИЙ ПРАВЫЙ */}
        <div className="validator__data">
          <p className="validator__data-heading">Tokens Bonded:</p>
          <span className="validator__data-text">{stake}<span className="validator__denom">{symbol}</span></span>
          <p className="validator__data-heading">Voting Power:</p>
          <span className="validator__data-text">{votingPower}</span>
          <p className="validator__data-heading">Commission:</p>
          <span className={commissionStyle}>{commissionText}</span>
          <p className="validator__data-heading">Website:</p>
          {website}
          <p className="validator__data-heading">Security Contact:</p>
          <span className="validator__data-text">{securityContact}</span>
          <p className="validator__data-heading">Details:</p>
          <span className="validator__data-text">{details}</span>

        </div>
      </div>
    </div>
  )
}

export default Validator;