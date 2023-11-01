import IChain from "../../models/IChain";

const crescentMainnet: IChain = {
  name: "Crescent Network",
  chainId: "crescent-1",
  coinGeckoId: "crescent-network",
  cosmostationId: "crescent",
  isMainnet: true,
  symbol: "CRE",
  denom: "ucre",
  decimals: 6,
  api: [
    { provider: "Polkachu", address: "https://crescent-api.polkachu.com" },
    { provider: "Crescent Network", address: "https://mainnet.crescent.network:1317" },
    { provider: "Pumpos", address: "https://api.crescent.pupmos.network" },
  ],
  descriptionEng: "Crescent Network is a Cosmos SDK-based DeFi hub powered by $CRE token and Inter-blockchain Communication protocol.",
  descriptionRus: "Crescent Network - это DeFi, основанное на Cosmos SDK, обеспеченное токеном $CRE и протоколом межсетевой коммуникации.",
  logo: "/logos/crescent.png",
  links: {
    website: 'https://crescent.network/',
    github: 'https://github.com/crescent-network/crescent',
    twitter: 'https://twitter.com/CrescentHub',
  },
}

export default crescentMainnet;