import IChain from "../../models/IChain";

const cosmosMainnet: IChain = {
  name: "Cosmos Hub",
  chainId: "cosmoshub-4",
  coinGeckoId: "cosmos",
  cosmostationId: "cosmoshub",
  isMainnet: true,
  symbol: "ATOM",
  denom: "uatom",
  decimals: 6,
  api: [
    { provider: "Notional", address: "https://api-cosmoshub-ia.cosmosia.notional.ventures" },
    { provider: "Blockapsis", address: "https://lcd-cosmoshub.blockapsis.com:443" },
    { provider: "Pupmos", address: "https://api-cosmoshub.pupmos.network" },
    { provider: "Allnodes", address: "https://cosmos-rest.publicnode.com" },
    { provider: "Staketab", address: "https://cosmos-rest.staketab.org" },
    { provider: "NodeStake", address: "https://api.cosmos.nodestake.top" },
    { provider: "Golden Ratio Staking", address: "https://rest-cosmoshub.goldenratiostaking.net" },
    { provider: "WhisperNode🤐", address: "https://lcd-cosmoshub.whispernode.com:443" },
  ],
  descriptionEng: "The Cosmos Hub is an Internet of Blockchains, a network of blockchains able to communicate with each other in a decentralized way.",
  descriptionRus: "Cosmos Hub - это так называемый Интернет Блокчейнов; сеть, позволяющая им коммуницировать между собой децентрализованным образом.",
  logo: "/logos/cosmos.png",
  links: {
    website: 'https://cosmos.network/',
    github: 'https://github.com/cosmos',
    twitter: 'https://twitter.com/cosmos',
  },
}

export default cosmosMainnet;