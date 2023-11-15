// Типизация
import IChain from "./IChain";
import ICoin from "./ICoin";
import IAvatarData from "./IAvatarData";
import IValidator from "./IValidator";
import IProposal from "./IProposal";
import IChainApi from "./IChainApi";
import IPool from "./IPool";



interface ICurrentChainState {
  "chain": IChain | null;
  "api": IChainApi | null,
  "avatars": any,
  "avatarsStatus": string | null,
  "avatarsError": any,
  "validators": IValidator[] | null,
  "validatorsStatus": string | null,
  "validatorsError": any,
  "proposals": IProposal[] | null,
  "proposalsStatus": string | null,
  "proposalsError": any,
  "communityPool": IPool[] | null,
  "communityPoolStatus": string | null,
  "communityPoolError": any,
  "totalBonded": string | null,
  "totalBondedStatus": string | null,
  "totalBondedError": any,
  "inflation": string | null,
  "inflationStatus": string | null,
  "inflationError": any,
  "unbondingTime": string | null,
  "unbondingTimeStatus": string | null,
  "unbondingTimeError": any,
  "blockHeight": string | null,
  "blockHeightStatus": string | null,
  "blockHeightError": any,
}

export default ICurrentChainState;