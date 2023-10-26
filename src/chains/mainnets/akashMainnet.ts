import IChain from "../../models/IChain";

const akashMainnet: IChain = {
  name: "Akash Network",
  chainId: "akashnet-2",
  coinGeckoId: "akash-network",
  cosmostationId: "akash",
  isMainnet: true,
  symbol: "AKT",
  denom: "uakt",
  decimals: 6,
  api: [
    "https://api-akash-ia.cosmosia.notional.ventures/",
    "https://akash-api.polkachu.com",
    "https://akash.c29r3.xyz:443/api",
    "https://akash.api.ping.pub"
  ],
  descriptionEng: "The world first decentralized open source cloud, and DeCloud for DeFi, built with the Cosmos SDK.",
  descriptionRus: "Первое в мире децентрализованное облако с открытым исходным кодом; DeCloud для DeFi, построенный на Cosmos SDK.",
  logo: "/logos/akash.png",
  links: {
    website: 'https://akash.network/',
    github: 'https://github.com/akash-network',
    twitter: 'https://twitter.com/akashnet_',
  },
}

export default akashMainnet;