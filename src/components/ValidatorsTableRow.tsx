import IValidatorsTableRowProps from "../models/IValidatorsTableRowProps";
import { cutDecimals, tweakCommission } from "../utils/formatting";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentChain, selectBlockHeight, selectCurrentChain, selectValidators, selectTotalBonded, selectInflation, setActiveProposals, setBlockHeight, setCommunityPool, setInflation, setTotalBonded, setUnbondingTime, setValidators } from "../store/reducers/currentChainSlice";
import { Link } from "react-router-dom";

function ValidatorsTableRow(props: IValidatorsTableRowProps) {

  const currentChain = useAppSelector(selectCurrentChain);
  const validator = props.validator;

  // РЕНДЕР АВАТАРА
  const avatarUrl = (validator.avatar) ? validator.avatar : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

  // РЕНДЕР РЕЙТИНГА
  const rank = '#' + validator.rank?.toString().padStart(3, '0');

  // РЕНДЕР МОНИКЕРА
  const moniker = validator.description.moniker;

  // РЕНДЕР АКТИВНОСТИ
  const activity = (validator.status === 'BOND_STATUS_BONDED') ? 'Active' : 'Inactive';
  const activityStyle = (validator.status === 'BOND_STATUS_BONDED') ? 'table-row__activity' : 'table-row__activity table-row__activity_inactive';

  // РЕНДЕР БОНДА
  let bond, bondStyle;
  if (validator.status === 'BOND_STATUS_BONDED') { bond = 'Bonded'; bondStyle = 'table-row__bond' }
  if (validator.status === 'BOND_STATUS_UNBONDED') { bond = 'Unbonded'; bondStyle = 'table-row__bond table-row__bond_unbonded' }
  if (validator.status === 'BOND_STATUS_UNBONDING') { bond = 'Unbonding'; bondStyle = 'table-row__bond table-row__bond_unbonding' }

  // РЕНДЕР ТЮРЬМЫ
  const jail = (validator.jailed) ? 'Jailed' : '';
  const jailStyle = (validator.jailed) ? 'table-row__jail' : 'table-row__jail_hidden';

  // РЕНДЕР ВЫСОКОЙ КОМИССИИ
  const highCommission = (Number(validator.commission.commission_rates.rate) > 0.1) ? 'High %' : '';
  const highCommissionStyle = (Number(validator.commission.commission_rates.rate) > 0.1) ? 'table-row__warning' : 'table-row__warning_hidden';

  // РЕНДЕР ВЕСА ГОЛОСА
  // const stake = Number(cutDecimals(validator.tokens, currentChain.decimals)).toLocaleString('en');
  // const symbol = currentChain.symbol;
  const votingPower = validator.voting_power + '%';

  // РЕНДЕР КОМИССИИ
  const commission = tweakCommission(validator.commission.commission_rates.rate) + '%';

  return (
    <div className="validators__table-row">

      {/* ВАЛИДАТОР */}
      <div className="validators__validator">
        <div style={{ backgroundImage: `url("${avatarUrl}")` }} className="validators__avatar" />
        <div className="validators__validator-info">
          <div className="validators__validator-main-info">
            <span className="validators__rank">{rank}</span>
            <Link to={`/${currentChain?.chainId}/validators/${validator.operator_address}`} state={validator} className="validators__moniker">{moniker}</Link>
          </div>
          <div className="validators__statuses">
            <span className={activityStyle}>{activity}</span>
            <span className={bondStyle}>{bond}</span>
            <span className={jailStyle}>{jail}</span>
            <span className={highCommissionStyle}>{highCommission}</span>
          </div>
          <div className="validators__vp-adaptive">{}<span>{}</span> ({votingPower})</div>
        </div>
      </div>

      {/* ВЕС ГОЛОСА */}
      <div className="validators__voting-power">
        <span className="validators__stake">{}<span>{}</span></span>
        <span className="validators__power">{votingPower}</span>
      </div>

      {/* КОМИССИЯ */}
      <span className="validators__commission">{commission}</span>
    </div>
  )
}

export default ValidatorsTableRow;