import IProposal from "./IProposal";
import IValidator from "./IValidator";

interface IChain {
  "name": string,
  "chainId": string,
  "coinGeckoId": string,
  "cosmostationId": string,
  "isMainnet": boolean,
  "symbol": string,
  "denom": string,
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