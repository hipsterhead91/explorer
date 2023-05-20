import IProposal from "./IProposal";
import IValidator from "./IValidator";

interface IChain {
  "name": string,
  "path": string,
  "cosmostation": string,
  "coinGecko": string,
  "chain": string,
  "isMain": boolean,
  "denom": string,
  "symbol": string,
  "decimals": number,
  "api": Array<string>,
  "description": string,
  "logo": string,

  // "price"?: string,
  // "inflation"?: string,
  // "communityPool"?: string,
  // "totalBonded"?: string,
  // "unbondingTime"?: string,
  // "blockHeight"?: string,
  // "validators"?: IValidator[],
  // "wholeSetLength"?: number,
  // "activeSetLength"?: number,
  // "activeProposals"?: IProposal[],
}

export default IChain;