import IChain from "../../models/IChain";

const evmosMainnet: IChain = {
  name: "Evmos",
  chainId: "evmos_9001-2",
  coinGeckoId: "evmos",
  cosmostationId: "evmos",
  isMainnet: true,
  symbol: "EVMOS",
  denom: "aevmos",
  decimals: 18,
  api: [
    "https://rest.bd.evmos.org:1317",
    "https://evmos-lcd.stakely.io",
    "https://api.evmos.nodestake.top",
    "https://api.evmos.silknodes.io",
    "https://evmos-rest.publicnode.com",
  ],
  description: "A Cosmos SDK-based IBC & Ethereum Virtual Machine-compatible blockchain.",
  logo: "/logos/evmos.png",
  links: {
    website: 'https://evmos.org/',
    github: 'https://github.com/tharsis/evmos',
    twitter: 'https://twitter.com/EvmosOrg',
  },
}

export default evmosMainnet;