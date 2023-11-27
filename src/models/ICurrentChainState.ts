// Типизация
import IChain from "./IChain";
import IValidator from "./IValidator";
import IProposal from "./IProposal";
import IChainApi from "./IChainApi";
import IPool from "./IPool";
import ISupply from "./ISupply";



interface ICurrentChainState {
  "chain": IChain | null;
  "api": IChainApi | null,
  "avatars": any,
  "validators": IValidator[] | null,
  "proposals": IProposal[] | null,
  "communityPool": IPool[] | null,
  "totalBonded": string | null,
  "supply": ISupply[] | null,
  "inflation": string | null,
  "unbondingTime": string | null,
  "blockHeight": string | null,
}

export default ICurrentChainState;