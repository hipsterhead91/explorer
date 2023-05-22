import IChain from "./IChain";
import IValidator from "./IValidator";

interface IValidatorsTableHeaderProps {
  shownValidators: IValidator[],
  setShownValidators: React.Dispatch<React.SetStateAction<IValidator[] | null>>,
  currentChain: IChain,
  isCurrentSetActive: boolean
}

export default IValidatorsTableHeaderProps;