// Пакеты
import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

// Типизация
import IValidator from "../models/IValidator";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain, selectValidators } from "../store/reducers/currentChainSlice";



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

  return (
    <div className="validator">
      <button onClick={() => returnToValidators()}className="validator__return-button">Return To Validators</button>
      <h1>{currentValidator?.description.moniker}</h1>
    </div>
  )
}

export default Validator;