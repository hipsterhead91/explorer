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
    { provider: "Polkachu", address: "https://evmos-api.polkachu.com" },
    { provider: "Notional", address: "https://api-evmos-ia.cosmosia.notional.ventures" },
    { provider: "Allnodes", address: "https://evmos-rest.publicnode.com" },
    { provider: "NodeStake", address: "https://api.evmos.nodestake.top" },
    { provider: "Evmos", address: "https://rest.bd.evmos.org:1317" },
    { provider: "Skynet Validators", address: "https://evmos-api.skynetvalidators.com" },
    { provider: "Golden Ratio Staking", address: "https://rest-evmos.goldenratiostaking.net" },
  ],
  descriptionEng: "A Cosmos SDK-based IBC & Ethereum Virtual Machine-compatible blockchain.",
  descriptionRus: "Блокчейн, основанный на Cosmos SDK и совместимый с виртуальными машинами Ethereum.",
  logo: "/logos/evmos.png",
  links: {
    website: 'https://evmos.org/',
    github: 'https://github.com/tharsis/evmos',
    twitter: 'https://twitter.com/EvmosOrg',
  },
}

export default evmosMainnet;