import IChain from "../../models/IChain";

const evmosTestnet: IChain = {
  name: "Evmos Testnet",
  chainId: "evmos_9001-4",
  coinGeckoId: "",
  cosmostationId: "evmos",
  isMainnet: false,
  symbol: "TEVMOS",
  denom: "atevmos",
  decimals: 18,
  api: [
    "https://rest.bd.evmos.dev:1317",
    "https://evmos-testnet-lcd.qubelabs.io",
    "https://api-t.evmos.nodestake.top",
  ],
  description: "A Cosmos SDK-based IBC & Ethereum Virtual Machine-compatible blockchain.",
  logo: "/logos/evmos.png",
  links: {
    website: 'https://evmos.org/',
    github: 'https://github.com/tharsis/evmos',
    twitter: 'https://twitter.com/EvmosOrg',
  },
}

export default evmosTestnet;

