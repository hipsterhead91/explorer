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
    "https://crescent-api.polkachu.com",
    "https://mainnet.crescent.network:1317",
    "https://api.crescent.pupmos.network"
  ],
  description: "Crescent Network is a Cosmos SDK-based DeFi hub powered by $CRE token and Inter-blockchain Communication protocol.",
  logo: "/logos/crescent.png",
  links: {
    website: 'https://crescent.network/',
    github: 'https://github.com/crescent-network/crescent',
    twitter: 'https://twitter.com/CrescentHub',
  },
}

export default crescentMainnet;