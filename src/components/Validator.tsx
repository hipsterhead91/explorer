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



  useEffect(() => {
    console.log(currentValidator);
  }, [currentValidator])

  let avatarUrl, monikerText, valoperText, activityText, activityStyle, bondText, bondStyle, jailText, jailStyle, highCommissionText, highCommissionStyle, rankText, tokensText, symbolText, votingPowerText, commissionText, commissionStyle, websiteText, securityContactText, detailsText;
  
  if (currentValidator) {

    if (currentValidator.avatar) {
      avatarUrl = currentValidator.avatar
    } else {
      avatarUrl = `${process.env["PUBLIC_URL"]}/images/no-avatar.png`
    };

    monikerText = currentValidator.description.moniker;
    valoperText = currentValidator.operator_address;

    if (currentValidator.status === "BOND_STATUS_BONDED") {
      activityText = "Active";
      activityStyle = "validator__status validator__status_good";
    } else {
      activityText = "Inactive";
      activityStyle = "validator__status validator__status_neutral";
    }

    if (currentValidator.status === 'BOND_STATUS_BONDED') {
      bondText = "Bonded";
      bondStyle = "validator__status validator__status_good";
    } else if (currentValidator.status === 'BOND_STATUS_UNBONDING') {
      bondText = "Unbonding";
      bondStyle = "validator__status validator__status_special";
    } else {
      bondText = "Unbonded";
      bondStyle = "validator__status validator__status_neutral";
    }

    if (currentValidator.jailed) {
      jailText = "Jailed";
      jailStyle = "validator__status validator__status_bad";
    } else {
      jailText = "";
      jailStyle = "validator__status validator__status_hidden";
    }

    if (Number(currentValidator.commission.commission_rates.rate) > 0.1) {
      highCommissionText = "High %";
      highCommissionStyle = "validator__status validator__status_bad";
    } else {
      highCommissionText = "";
      highCommissionStyle = "validator__status validator__status_hidden";
    }

    if (currentValidator.rank) {
      rankText = "#" + currentValidator.rank.toString().padStart(3, '0');
    } else {
      rankText = "#000";
    }

    if (currentChain) {
      tokensText = tweakTokens(currentValidator.tokens, currentChain);
      symbolText = currentChain.symbol;
    } else {
      tokensText = "—";
      symbolText = "";
    }

    if (currentValidator.voting_power && currentChain) {
      votingPowerText = tweakVotingPower(currentValidator.voting_power, currentChain) + '%'
    } else {
      votingPowerText = "";
    }

    commissionText = tweakCommission(currentValidator.commission.commission_rates.rate) + '%';
    if (Number(currentValidator.commission.commission_rates.rate) > 0.1) {
      commissionStyle = "validator__commission-value validator__commission-value_high";
    } else {
      commissionStyle = "validator__commission-value";
    }

    /* В ранней версии вместо websiteText у меня был websiteEl, который в случае отсутствия ссылки превращался в текстовый прочерк, а в случае наличия - в кликабельную ссылку. Однако я обнаружил, что если валидатор указал ссылку не в формате http://site.com, а просто как site.com, то её нельзя передавать в href - ссылка не будет корректно работать. Таких валидаторов меньшинство, но всё же. По этой причине решил пока оставить сайт обычным текстом, но позже возможно напишу для ссылок валидацию, чтобы все варианты работали корректно.  */
    if (currentValidator.description.website) {
      websiteText = currentValidator.description.website;
    } else { 
      websiteText = "—";
    }

    if (currentValidator.description.security_contact) {
      securityContactText = currentValidator.description.website;
    } else { 
      securityContactText = "—";
    }

    if (currentValidator.description.details) {
      detailsText = currentValidator.description.details;
    } else { 
      detailsText = "—";
    }

  } else {
    avatarUrl = `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;
    monikerText = "Validator Doesn't Exist";
    valoperText = "no validator operator address";
    activityText = "No activity";
    activityStyle = "validator__status validator__status_neutral";
    bondText = "";
    bondStyle = "validator__status validator__status_hidden";
    jailText = "";
    jailStyle = "validator__status validator__status_hidden";
    highCommissionText = "";
    highCommissionStyle = "validator__status validator__status_hidden";
    rankText = "#000";
    tokensText = "—";
    symbolText = "";
    votingPowerText = "—";
    commissionText = "—";
    commissionStyle = "validator__commission-value";
    websiteText = "—";
    securityContactText = "—";
    detailsText = "—";
  }











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

  // // АВАТАР
  // const avatarUrl = (currentValidator?.avatar)
  //   ? currentValidator.avatar
  //   : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

  // // РЕЙТИНГ
  // const rank = '#' + currentValidator?.rank?.toString().padStart(3, '0');

  // // МОНИКЕР
  // const moniker = currentValidator?.description.moniker;

  // // ВАЛОПЕР
  // const valoper = currentValidator?.operator_address;

  // // АКТИВНОСТЬ
  // const activityText = (currentValidator?.status === 'BOND_STATUS_BONDED')
  //   ? 'Active'
  //   : 'Inactive';

  // const activityStyle = (currentValidator?.status === 'BOND_STATUS_BONDED')
  //   ? 'validator__status validator__status_good'
  //   : 'validator__status validator__status_neutral';

  // // БОНД
  // const bondText =
  //   (currentValidator?.status === 'BOND_STATUS_BONDED')
  //     ? 'Bonded'
  //     : (currentValidator?.status === 'BOND_STATUS_UNBONDED')
  //       ? 'Unbonded'
  //       : (currentValidator?.status === 'BOND_STATUS_UNBONDING')
  //         ? 'Unbonding'
  //         : '';

  // const bondStyle =
  //   (currentValidator?.status === 'BOND_STATUS_BONDED')
  //     ? 'validator__status validator__status_good'
  //     : (currentValidator?.status === 'BOND_STATUS_UNBONDED')
  //       ? 'validator__status validator__status_neutral'
  //       : (currentValidator?.status === 'BOND_STATUS_UNBONDING')
  //         ? 'validator__status validator__status_special'
  //         : '';

  // // ТЮРЬМА
  // const jailText = (currentValidator?.jailed) ? 'Jailed' : '';
  // const jailStyle = (currentValidator?.jailed)
  //   ? 'validator__status validator__status_bad'
  //   : 'validator__status validator__status_hidden';

  // // ВЫСОКАЯ КОМИССИЯ
  // const highCommissionText = (Number(currentValidator?.commission.commission_rates.rate) > 0.1)
  //   ? 'High %'
  //   : '';

  // const highCommissionStyle = (Number(currentValidator?.commission.commission_rates.rate) > 0.1)
  //   ? 'validator__status validator__status_bad'
  //   : 'validator__status validator__status_hidden';


  // // РЕНДЕР ВЕСА ГОЛОСА
  // const stake = (currentChain && currentValidator)
  //   ? tweakTokens(currentValidator.tokens, currentChain)
  //   : '';
  // const symbol = currentChain?.symbol;
  // const votingPower = (currentChain && currentValidator?.voting_power)
  //   ? tweakVotingPower(currentValidator.voting_power, currentChain) + '%'
  //   : '';

  // // РЕНДЕР КОМИССИИ
  // const commissionText = (currentValidator)
  //   ? tweakCommission(currentValidator.commission.commission_rates.rate) + '%'
  //   : '';

  // const commissionStyle = (currentValidator && Number(currentValidator.commission.commission_rates.rate) > 0.1)
  //   ? 'validator__commission-value validator__commission-value_high'
  //   : 'validator__commission-value';

  // // РЕНДЕР ВЕБСАЙТА
  // const website = (currentValidator?.description.website === '')
  //   ? <p className="validator__data-text">—</p>
  //   : <a className="validator__data-link" href={currentValidator?.description.website} target="_blank">{currentValidator?.description.website}</a>

  // // РЕНДЕР БЕЗОПАСНОГО КОНТАКТА
  // const securityContact = (currentValidator?.description.security_contact === '') ? '—' : currentValidator?.description.security_contact;

  // // РЕНДЕР ОПИСАНИЯ
  // const details = (currentValidator?.description.details === '') ? '—' : currentValidator?.description.details;




  return (
    <div className="validator">
      <button onClick={() => returnToValidators()} className="validator__return-button">&#9664; Return</button>
      <div className="validator__card">

        <div className="validator__avatar" style={{ backgroundImage: `url("${avatarUrl}")` }}></div>

        <div className="validator__heading">
          <h1 className="validator__moniker">{monikerText}</h1>
          <p className="validator__valoper">{valoperText}</p>
          <div className="validator__statuses">
            <span className={activityStyle}>{activityText}</span>
            <span className={bondStyle}>{bondText}</span>
            <span className={jailStyle}>{jailText}</span>
            <span className={highCommissionStyle}>{highCommissionText}</span>
          </div>
        </div>

        <span className="validator__rank">{rankText}</span>

        <div className="validator__data">
          <p className="validator__data-heading">Tokens Bonded:</p>
          <span className="validator__data-text">{tokensText}<span className="validator__denom">{symbolText}</span></span>
          <p className="validator__data-heading">Voting Power:</p>
          <span className="validator__data-text">{votingPowerText}</span>
          <p className="validator__data-heading">Commission:</p>
          <span className={commissionStyle}>{commissionText}</span>
          <p className="validator__data-heading">Website:</p>
          <span className="validator__data-text">{websiteText}</span>
          <p className="validator__data-heading">Security Contact:</p>
          <span className="validator__data-text">{securityContactText}</span>
          <p className="validator__data-heading">Details:</p>
          <span className="validator__data-text">{detailsText}</span>

        </div>
      </div>
    </div>
  )
}

export default Validator;