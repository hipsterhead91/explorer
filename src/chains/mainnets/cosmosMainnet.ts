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
    "https://api-cosmoshub-ia.cosmosia.notional.ventures",
    "https://lcd-cosmoshub.blockapsis.com:443",
    "https://cosmos.api.ping.pub"
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