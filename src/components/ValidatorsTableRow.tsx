// Общее
import { Link } from "react-router-dom";

// Типизация
import IValidatorsTableRowProps from "../models/IValidatorsTableRowProps";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";

// Прочее
import { tweakTokens, tweakCommission } from "../utils/formatting";



function ValidatorsTableRow(props: IValidatorsTableRowProps) {

  const currentChain = useAppSelector(selectCurrentChain);
  const validator = props.validator;

  // АВАТАР
  const avatarUrl =
    (validator.avatar)
      ? validator.avatar
      : `${process.env["PUBLIC_URL"]}/images/no-avatar.png`;

  // РАНГ
  const rankText = validator.rank?.toString().padStart(3, "0");
  const rankStyle =
    (validator.status === "BOND_STATUS_BONDED")
      ? "validators-tr__rank validators-tr__rank_active"
      : "validators-tr__rank validators-tr__rank_inactive"

  // МОНИКЕР
  const monikerText = validator.description.moniker;

  // ВЕС ГОЛОСА
  const tokensText = (currentChain) ? tweakTokens(validator.tokens, currentChain) : "—";
  const symbolText = (currentChain) ? currentChain.symbol : "";
  const votingPowerText = (validator.voting_power) ? "[" + validator.voting_power + "%" + "]" : "";

  // КОМИССИЯ
  const commissionText = tweakCommission(validator.commission.commission_rates.rate) + "%";
  const commissionStyle =
    ((Number(validator.commission.commission_rates.rate) > 0.1))
      ? "validators-tr__commission-value validators-tr__commission-value_high"
      : "validators-tr__commission-value";

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