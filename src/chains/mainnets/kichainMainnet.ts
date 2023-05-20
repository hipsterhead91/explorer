import IChain from "../../models/IChain";

const kichainMainnet: IChain = {
  name: "KiChain",
  chainId: "kichain-2",
  coinGeckoId: "ki",
  cosmostationId: "ki",
  isMainnet: true,
  symbol: "XKI",
  denom: "uxki",
  decimals: 6,
  api: [
    "https://api-mainnet.blockchain.ki",
    "https://ki.api.ping.pub",
    "https://api.ki.nodestake.top"
  ],
  description: "Open-source, public blockchain designed to enable decentralized finance, built with the Cosmos SDK.",
  logo: "/logos/kichain.png"
}

export default kichainMainnet;