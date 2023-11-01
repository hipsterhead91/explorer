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
    { provider: "KiChain", address: "https://api-mainnet.blockchain.ki" },
    { provider: "Ping Pub", address: "https://ki.api.ping.pub" },
    { provider: "", address: "https://api.ki.nodestake.top" },
  ],
  descriptionEng: "Open-source, public blockchain designed to enable decentralized finance, built with the Cosmos SDK.",
  descriptionRus: "Публичный блокчейн с открытым исходным кодом, построенный на Cosmos SDK, поддерживающий децентрализованные финансы.",
  logo: "/logos/kichain.png",
  links: {
    website: 'https://foundation.ki/',
    github: 'https://github.com/KiFoundation',
    twitter: 'https://twitter.com/Ki_Foundation',
  },
}

export default kichainMainnet;