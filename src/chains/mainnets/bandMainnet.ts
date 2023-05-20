import IChain from "../../models/IChain";

const bandMainnet: IChain = {
  name: "Band Protocol",
  chainId: "laozi-mainnet",
  coinGeckoId: "band-protocol",
  cosmostationId: "bandprotocol",
  isMainnet: true,
  symbol: "BAND",
  denom: "uband",
  decimals: 6,
  api: [
    "https://laozi1.bandchain.org/api"
  ],
  description: "Cross-chain data oracle platform that aggregates and connects real-world data and APIs to smart contracts.",
  logo: "/logos/band.png"
}

export default bandMainnet;