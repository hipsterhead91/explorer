import IChain from "../../models/IChain";

const junoMainnet: IChain = {
  name: "Juno",
  chainId: "juno-1",
  coinGeckoId: "juno-network",
  cosmostationId: "juno",
  isMainnet: true,
  symbol: "JUNO",
  denom: "ujuno",
  decimals: 6,
  api: [
    "https://api-juno-ia.cosmosia.notional.ventures",
    "https://juno-api.polkachu.com",
    "https://lcd-juno.itastakers.com"
  ],
  descriptionEng: "Juno is an interoperable smart contract network. Highly scalable, robust, secure and easy to deploy.",
  descriptionRus: "Juno - это быстрая в развёртывании, легко масштабируемая, безопасная сесть со смарт-контрактами.",
  logo: "/logos/juno.png",
  links: {
    website: 'https://www.junonetwork.io/',
    github: 'https://github.com/CosmosContracts',
    twitter: 'https://twitter.com/JunoNetwork',
  },
}

export default junoMainnet;