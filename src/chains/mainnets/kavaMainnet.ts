import IChain from "../../models/IChain";

const kavaMainnet: IChain = {
  name: "Kava",
  chainId: "kava_2222-10",
  coinGeckoId: "kava",
  cosmostationId: "kava",
  isMainnet: true,
  symbol: "KAVA",
  denom: "ukava",
  decimals: 6,
  api: [
    "https://api.data.kava.io"
  ],
  descriptionEng: "The Kava zone brings major assets like BTC, ETH, and XRP to Cosmos and provides CDP functionality (multi-collateral debt positions) for issuing synthetic assets and leveraging exposure.",
  descriptionRus: "Зона Kava объединяет основные активы, такие как BTC, ETH и XRP, в Cosmos и предоставляет функциональность CDP (долговые позиции с несколькими залогами) для выпуска синтетических активов и увеличения риска.",
  logo: "/logos/kava.png",
  links: {
    website: 'https://www.kava.io/',
    github: 'https://github.com/kava-labs',
    twitter: 'https://twitter.com/KAVA_CHAIN',
  },
}

export default kavaMainnet;