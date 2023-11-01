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
    { provider: "Notional", address: "https://api-juno-ia.cosmosia.notional.ventures" },
    { provider: "Polkachu", address: "https://juno-api.polkachu.com" },
    { provider: "Itastakers", address: "https://lcd-juno.itastakers.com" },
    { provider: "Golden Ratio Staking", address: "https://rest-juno.goldenratiostaking.net" },
    { provider: "Reece", address: "https://juno-api.reece.sh" },
    { provider: "Allnodes", address: "https://juno-rest.publicnode.com" },
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