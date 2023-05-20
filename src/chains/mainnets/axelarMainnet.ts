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
    "https://api-axelar-ia.cosmosia.notional.ventures",
    "https://lcd-axelar.imperator.co",
    "https://axelar-lcd.quickapi.com",
    "https://axelar-api.polkachu.com",
    "https://axelar-lcd.qubelabs.io",
    "https://axelar-rest.chainode.tech",
    "https://axelar-lcd.quantnode.tech",
    "https://api-1.axelar.nodes.guru:443"
  ],
  description: "A decentralized multi-chain network that enables cross chain communication with a simple pegging mechanism.",
  logo: "/logos/axelar.png"
}

export default axelarMainnet;