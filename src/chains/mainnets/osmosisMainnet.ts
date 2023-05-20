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
  description: "The interchain AMM powered by the Cosmos Inter-Blockchain Communication protocol.",
  logo: "/logos/osmosis.png"
}

export default osmosisMainnet;