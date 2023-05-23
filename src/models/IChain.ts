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
}

export default IChain;