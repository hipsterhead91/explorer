import IChain from "./IChain";
import IValidator from "./IValidator";
import IProposal from "./IProposal";

interface ICurrentChainState {
  value: IChain | null;
  price: string | null,
  inflation: string | null,
  communityPool: string | null,
  totalBonded: string | null,
  unbondingTime: string | null,
  blockHeight: string | null,
  validators: IValidator[] | null,
  activeProposals: IProposal[] | null,
}

export default ICurrentChainState;