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
  description: "The world first decentralized open source cloud, and DeCloud for DeFi, built with the Cosmos SDK.",
  logo: "/logos/akash.png"
}

export default akashMainnet;