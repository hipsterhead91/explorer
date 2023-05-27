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

  // АВАТАР
  const avatarUrl = (validator.avatar)
    ? validator.avatar
    : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

  // МОНИКЕР
  const moniker = validator.description.moniker;

  // РЕЙТИНГ
  const rankText = '#' + validator.rank?.toString().padStart(3, '0');
  const rankStyle = (validator.status === 'BOND_STATUS_BONDED')
    ? 'validators-tr__status validators-tr__status_good'
    : 'validators-tr__status validators-tr__status_neutral';

  // АКТИВНОСТЬ
  const activityText = (validator.status === 'BOND_STATUS_BONDED')
    ? 'Active'
    : 'Inactive';

  const activityStyle = (validator.status === 'BOND_STATUS_BONDED')
    ? 'validators-tr__status validators-tr__status_good'
    : 'validators-tr__status validators-tr__status_neutral';

  // БОНД
  const bondText =
    (validator.status === 'BOND_STATUS_BONDED')
      ? 'Bonded'
      : (validator.status === 'BOND_STATUS_UNBONDED')
        ? 'Unbonded'
        : (validator.status === 'BOND_STATUS_UNBONDING')
          ? 'Unbonding'
          : '';

  const bondStyle =
    (validator.status === 'BOND_STATUS_BONDED')
      ? 'validators-tr__status validators-tr__status_good'
      : (validator.status === 'BOND_STATUS_UNBONDED')
        ? 'validators-tr__status validators-tr__status_neutral'
        : (validator.status === 'BOND_STATUS_UNBONDING')
          ? 'validators-tr__status validators-tr__status_special'
          : '';

  // ТЮРЬМА
  const jailText = (validator.jailed) ? 'Jailed' : '';
  const jailStyle = (validator.jailed)
    ? 'validators-tr__status validators-tr__status_bad'
    : 'validators-tr__status validators-tr__status_hidden';

  // ВЫСОКАЯ КОМИССИЯ
  const highCommissionText = (Number(validator.commission.commission_rates.rate) > 0.1)
    ? 'High %'
    : '';

  const highCommissionStyle = (Number(validator.commission.commission_rates.rate) > 0.1)
    ? 'validators-tr__status validators-tr__status_bad'
    : 'validators-tr__status validators-tr__status_hidden';

  // РЕНДЕР ВЕСА ГОЛОСА
  const stake = (currentChain)
    ? tweakTokens(validator.tokens, currentChain)
    : '';
  const symbol = currentChain?.symbol;
  const votingPower = (currentChain && validator.voting_power)
    ? tweakVotingPower(validator.voting_power, currentChain) + '%'
    : '';

  // РЕНДЕР КОМИССИИ
  const commissionText = tweakCommission(validator.commission.commission_rates.rate) + '%';
  const commissionStyle = (Number(validator.commission.commission_rates.rate) > 0.1)
    ? 'validators-tr__commission-value validators-tr__commission-value_high'
    : 'validators-tr__commission-value';

  return (
    <Link to={`/${currentChain?.chainId}/validators/${validator.operator_address}`} className="validators-tr">

      {/* ВАЛИДАТОР */}
      <div className="validators-tr__validator">
        <div style={{ backgroundImage: `url("${avatarUrl}")` }} className="validators-tr__avatar"></div>
        <div className="validators-tr__info">
          <span className="validators-tr__moniker">{moniker}</span>
          <div className="validators-tr__statuses">
            <span className={rankStyle}>{rankText}</span>
            <span className={activityStyle}>{activityText}</span>
            <span className={bondStyle}>{bondText}</span>
            <span className={jailStyle}>{jailText}</span>
            <span className={highCommissionStyle}>{highCommissionText}</span>
          </div>
        </div>
      </div>

      {/* ВЕС ГОЛОСА */}
      <div className="validators-tr__voting-power">
        <span className="validators-tr__stake">{stake}
          <span className="validators-tr__symbol">{symbol}</span>
        </span>
        <span className="validators-tr__power">{votingPower}</span>
      </div>

      {/* КОМИССИЯ */}
      <div className="validators-tr__commission">
        <span className={commissionStyle}>{commissionText}</span>
      </div>
    </Link>
  )
}

export default ValidatorsTableRow;