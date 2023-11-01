// Типизация
import IChain from "./IChain";
import ICoin from "./ICoin";
import IValidator from "./IValidator";
import IProposal from "./IProposal";
import IChainApi from "./IChainApi";



interface ICurrentChainState {
  "chain": IChain | null;
  "price": ICoin | null,
  "inflation": string | null,
  "communityPool": string | null,
  "totalBonded": string | null,
  "unbondingTime": string | null,
  "blockHeight": string | null,
  "validators": IValidator[] | null,
  "proposals": IProposal[] | null,
  "api": IChainApi | null,
}

export default ICurrentChainState;