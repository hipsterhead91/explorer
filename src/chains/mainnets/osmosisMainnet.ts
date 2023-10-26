import IChain from "../../models/IChain";

const osmosisMainnet: IChain = {
  name: "Osmosis",
  chainId: "osmosis-1",
  coinGeckoId: "osmosis",
  cosmostationId: "osmosis",
  isMainnet: true,
  symbol: "OSMO",
  denom: "uosmo",
  decimals: 6,
  api: [
    "https://api-osmosis-ia.cosmosia.notional.ventures",
    "https://osmosis-api.polkachu.com",
    "https://osmo.api.ping.pub",
    "https://lcd-osmosis.blockapsis.com"
  ],
  descriptionEng: "The interchain AMM powered by the Cosmos Inter-Blockchain Communication protocol.",
  descriptionRus: "Межсетевой АММ, работающий на протоколе общения Cosmos Inter-Blockchain.",
  logo: "/logos/osmosis.png",
  links: {
    website: 'https://osmosis.zone/',
    github: 'https://github.com/osmosis-labs/docs',
    twitter: 'https://twitter.com/osmosiszone',
  },
}

export default osmosisMainnet;