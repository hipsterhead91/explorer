// Типизация
import IValidator from "./IValidator";



interface IValidatorsTableHeaderProps {
  shownValidators: IValidator[] | null,
  setShownValidators: React.Dispatch<React.SetStateAction<IValidator[] | null>>,
  isCurrentSetActive: boolean,
}

export default IValidatorsTableHeaderProps;