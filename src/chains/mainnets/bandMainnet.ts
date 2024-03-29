import IChain from "../../models/IChain";

const bandMainnet: IChain = {
  name: "Band Protocol",
  chainId: "laozi-mainnet",
  coinGeckoId: "band-protocol",
  cosmostationId: "bandprotocol",
  isMainnet: true,
  symbol: "BAND",
  denom: "uband",
  decimals: 6,
  api: [
    { provider: "Band Protocol", address: "https://laozi1.bandchain.org/api" },
  ],
  descriptionEng: "Cross-chain data oracle platform that aggregates and connects real-world data and APIs to smart contracts.",
  descriptionRus: "Кроссчейн оракул, который собирает и соединяет информацию из реального мира со смарт-контрактами.",
  logo: "/logos/band.png",
  links: {
    website: 'https://bandprotocol.com/',
    github: 'https://github.com/bandprotocol',
    twitter: 'https://twitter.com/BandProtocol',
  },
}

export default bandMainnet;