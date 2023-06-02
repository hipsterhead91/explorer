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

  let avatarUrl, monikerText, valoperText, activityText, activityStyle, bondText, bondStyle, jailText, jailStyle, highCommissionText, highCommissionStyle, rankText, tokensText, symbolText, votingPowerText, commissionText, commissionStyle, websiteText, securityContactText, detailsText;

  // РЕНДЕР ИНФОРМАЦИИ О ВАЛИДАТОРЕ
  if (currentValidator) {

    avatarUrl = (currentValidator.avatar)
      ? currentValidator.avatar
      : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

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
      commissionStyle = "validator__commission-value validator__commission-value_high";
    } else {
      highCommissionText = "";
      highCommissionStyle = "validator__status validator__status_hidden";
      commissionStyle = "validator__commission-value";
    }

    rankText = (currentValidator.rank)
      ? "#" + currentValidator.rank.toString().padStart(3, '0')
      : "#000";

    if (currentChain) {
      tokensText = tweakTokens(currentValidator.tokens, currentChain);
      symbolText = currentChain.symbol;
    } else {
      tokensText = "—";
      symbolText = "";
    }

    votingPowerText = (currentValidator.voting_power && currentChain)
      ? tweakVotingPower(currentValidator.voting_power, currentChain) + '%'
      : "";

    commissionText = tweakCommission(currentValidator.commission.commission_rates.rate) + '%';

    /* В ранней версии вместо websiteText у меня был websiteEl, который в случае отсутствия ссылки превращался в текстовый прочерк, а в случае наличия - в кликабельную ссылку. Однако я обнаружил, что если валидатор указал ссылку не в формате http://site.com, а просто как site.com, то её нельзя передавать в href - ссылка не будет корректно работать. Таких валидаторов меньшинство, но всё же. По этой причине решил пока оставить сайт обычным текстом, но позже возможно напишу для ссылок валидацию, чтобы все варианты работали корректно.  */
    websiteText = (currentValidator.description.website)
      ? currentValidator.description.website
      : "—";

    securityContactText = (currentValidator.description.security_contact)
      ? currentValidator.description.security_contact
      : "—";

    detailsText = (currentValidator.description.details)
      ? currentValidator.description.details
      : "—";
  }

  // РЕНДЕР ДЛЯ НЕ СУЩЕСТВУЮЩЕГО ВАЛИДАТОРА
  else {
    avatarUrl = `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;
    monikerText = "Oops! Validator Doesn't Exist";
    valoperText = "Here could be a validator operator address";
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

  return (
    <div className="validator">
      <button onClick={() => returnToValidators()} className="validator__return-button">&#9664; Go Back</button>
      <div className="validator__card">

        {/* СВЕРХУ СЛЕВА */}
        <div className="validator__avatar" style={{ backgroundImage: `url("${avatarUrl}")` }}></div>

        {/* СВЕРХУ СПРАВА */}
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

        {/* СНИЗУ СЛЕВА */}
        <span className="validator__rank">{rankText}</span>

        {/* СНИЗУ СПРАВА */}
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