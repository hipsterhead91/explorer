import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCurrentChain, selectValidators, selectTotalBonded } from "../store/reducers/currentChainSlice";
import ValidatorsTableHeader from "./ValidatorsTableHeader";
import ValidatorsTableRow from "./ValidatorsTableRow";

function Validators() {

  const currentChain = useAppSelector(selectCurrentChain);
  const dispatch = useAppDispatch();

  const [shownValidators, setShownValidators] = useState([]);
  const [shownValidatorsBackup, setShownValidatorsBackup] = useState([]); // нужен для отката после фильтраций

  const totalBonded = useAppSelector(selectTotalBonded);
  const validators = useAppSelector(selectValidators);



  const heading = (currentChain === null) ? '' : currentChain.isMainnet ? currentChain.name : `${currentChain.name} Testnet`;
  const subheading = (currentChain === null) ? '' : `${currentChain.isMainnet ? 'mainnet' : 'testnet'} · ${currentChain.chainId}`;



  return (
    <div className="validators">
      <div className="validators__container">
        <div className="validators__header">
          <h1>{heading}</h1>
          <span>{subheading}</span>
        </div>
        <div className="validators__nav">

        </div>
        <div className="validators__table">
          <ValidatorsTableHeader />
          <div className="validators__rows">
            {validators?.map(validator => {
              return <ValidatorsTableRow key={validator.operator_address} validator={validator} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Validators;