// Пакеты
import { Link } from "react-router-dom";

// Типизация
import IValidatorsTableRowProps from "../models/IValidatorsTableRowProps";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";

// Прочее
import { tweakTokens, tweakVotingPower, tweakCommission } from "../utils/formatting";



function ValidatorsTableRow(props: IValidatorsTableRowProps) {

  const currentChain = useAppSelector(selectCurrentChain);
  const validator = props.validator;

  let avatarUrl, monikerText, activityText, activityStyle, bondText, bondStyle, jailText, jailStyle, highCommissionText, highCommissionStyle, rankText, tokensText, symbolText, votingPowerText, commissionText, commissionStyle;

  avatarUrl = (validator.avatar)
    ? validator.avatar
    : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

  monikerText = validator.description.moniker;

  if (validator.status === 'BOND_STATUS_BONDED') {
    activityText = "Active";
    activityStyle = "validators-tr__status validators-tr__status_good";
  } else {
    activityText = "Inactive";
    activityStyle = "validators-tr__status validators-tr__status_neutral";
  }

  if (validator.status === 'BOND_STATUS_BONDED') {
    bondText = "Bonded";
    bondStyle = "validators-tr__status validators-tr__status_good";
  } else if (validator.status === 'BOND_STATUS_UNBONDING') {
    bondText = "Unbonding";
    bondStyle = "validators-tr__status validators-tr__status_special";
  } else {
    bondText = "Unbonded";
    bondStyle = "validators-tr__status validators-tr__status_neutral";
  }

  if (validator.jailed) {
    jailText = "Jailed";
    jailStyle = "validators-tr__status validators-tr__status_bad";
  } else {
    jailText = "";
    jailStyle = "validators-tr__status validators-tr__status_hidden";
  }

  if ((Number(validator.commission.commission_rates.rate) > 0.1)) {
    highCommissionText = "High %";
    highCommissionStyle = "validators-tr__status validators-tr__status_bad";
    commissionStyle = "validators-tr__commission-value validators-tr__commission-value_high";
  } else {
    highCommissionText = "";
    highCommissionStyle = "validators-tr__status validators-tr__status_hidden";
    commissionStyle = "validators-tr__commission-value";
  }

  if (currentChain) {
    tokensText = tweakTokens(validator.tokens, currentChain);
    symbolText = currentChain.symbol;
  } else {
    tokensText = "—";
    symbolText = "";
  }

  votingPowerText = (validator.voting_power && currentChain)
    ? tweakVotingPower(validator.voting_power, currentChain) + "%"
    : "";

  commissionText = tweakCommission(validator.commission.commission_rates.rate) + "%";

  return (
    <Link to={`/${currentChain?.chainId}/validators/${validator.operator_address}`} className="validators-tr">

      {/* ВАЛИДАТОР */}
      <div className="validators-tr__validator">
        <div style={{ backgroundImage: `url("${avatarUrl}")` }} className="validators-tr__avatar"></div>
        <div className="validators-tr__info">
          <div className="validators-tr__alignment">
            <span className="validators-tr__rank">{rankText}</span>
            <span className="validators-tr__moniker">{monikerText}</span>
          </div>
          <div className="validators-tr__statuses">
            <span className={activityStyle}>{activityText}</span>
            <span className={bondStyle}>{bondText}</span>
            <span className={jailStyle}>{jailText}</span>
            <span className={highCommissionStyle}>{highCommissionText}</span>
          </div>
        </div>
      </div>

      {/* ВЕС ГОЛОСА */}
      <div className="validators-tr__voting-power">
        <span className="validators-tr__stake">{tokensText}
          <span className="validators-tr__symbol">{symbolText}</span>
        </span>
        <span className="validators-tr__power">{votingPowerText}</span>
      </div>

      {/* КОМИССИЯ */}
      <div className="validators-tr__commission">
        <span className={commissionStyle}>{commissionText}</span>
      </div>
    </Link>
  )
}

export default ValidatorsTableRow;