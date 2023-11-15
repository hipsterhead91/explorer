import IChain from "../../models/IChain";

const axelarMainnet: IChain = {
  name: "Axelar",
  chainId: "axelar-dojo-1",
  coinGeckoId: "axelar",
  cosmostationId: "axelar",
  isMainnet: true,
  symbol: "AXL",
  denom: "uaxl",
  decimals: 6,
  api: [
    { provider: "Polkachu", address: "https://axelar-api.polkachu.com" },
    { provider: "Imperator", address: "https://lcd-axelar.imperator.co" },
    { provider: "Qubelabs", address: "https://axelar-lcd.qubelabs.io" },
    { provider: "Quantnode", address: "https://axelar-lcd.quantnode.tech" },
    { provider: "Nodes.Guru", address: "https://api-1.axelar.nodes.guru:443" },
    { provider: "Quickapi", address: "https://axelar-lcd.quickapi.com" },
    { provider: "Chainode", address: "https://axelar-rest.chainode.tech" },
    { provider: "Notional", address: "https://api-axelar-ia.cosmosia.notional.ventures" },
  ],
  descriptionEng: "A decentralized multi-chain network that enables cross chain communication with a simple pegging mechanism.",
  descriptionRus: "Децентрализованная мультичейн сеть, позволяющая взаимодействовать между различными блокчейнами посредством простого механизма фиксации.",
  logo: "/logos/axelar.png",
  links: {
    website: 'https://axelar.network/',
    github: 'https://github.com/axelarnetwork/axelar-core',
    twitter: 'https://twitter.com/axelarcore',
  },
}

export default axelarMainnet;