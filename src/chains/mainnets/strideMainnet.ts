import IChain from "../../models/IChain";

const strideMainnet: IChain = {
  name: "Stride",
  chainId: "stride-1",
  coinGeckoId: "stride",
  cosmostationId: "stride",
  isMainnet: true,
  symbol: "STRD",
  denom: "ustrd",
  decimals: 6,
  api: [
    { provider: "Polkachu", address: "https://stride-api.polkachu.com" },
    { provider: "Kjnodes", address: "https://stride.api.kjnodes.com" },
    { provider: "Allnodes", address: "https://stride-rest.publicnode.com" },
    { provider: "NodeStake", address: "https://api.stride.nodestake.top" },
    { provider: "Nodeist", address: "https://api-stride.nodeist.net" },
  ],
  descriptionEng: "Stride is a liquid staking protocol that unlocks the liquidity for staked assets in the IBC ecosystem.",
  descriptionRus: "Stride - это протокол для ликвидного стейкинга, предоставляющий ликвидность для размещенных активов в экосистеме IBC.",
  logo: "/logos/stride.png",
  links: {
    website: 'https://www.stride.zone/',
    github: 'https://github.com/Stride-Labs/stride',
    twitter: 'https://twitter.com/stride_zone',
  },
}

export default strideMainnet;