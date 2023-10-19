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

  let avatarUrl, monikerText, rankText, rankStyle, tokensText, symbolText, votingPowerText, commissionText, commissionStyle;

  avatarUrl = (validator.avatar)
    ? validator.avatar
    : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

  if (validator.rank) {
    rankText = validator.rank.toString().padStart(3, "0");
  }

  if (validator.status === "BOND_STATUS_BONDED") {
    rankStyle = "validators-tr__rank validators-tr__rank_active";
  } else {
    rankStyle = "validators-tr__rank validators-tr__rank_inactive";
  }

  monikerText = validator.description.moniker;

  if ((Number(validator.commission.commission_rates.rate) > 0.1)) {
    commissionStyle = "validators-tr__commission-value validators-tr__commission-value_high";
  } else {
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
    ? "[" + tweakVotingPower(validator.voting_power, currentChain) + "%" + "]"
    : "";

  commissionText = tweakCommission(validator.commission.commission_rates.rate) + "%";

  return (
    <Link to={`/${currentChain?.chainId}/validators/${validator.operator_address}`} className="validators-tr">

      {/* ВАЛИДАТОР */}
      <div className="validators-tr__validator">
        <div style={{ backgroundImage: `url("${avatarUrl}")` }} className="validators-tr__avatar">
          <div className={rankStyle}>{rankText}</div>
        </div>
        <span className="validators-tr__moniker">{monikerText}</span>
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