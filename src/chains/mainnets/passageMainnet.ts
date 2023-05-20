import IChain from "../../models/IChain";

const passageMainnet: IChain = {
  name: "Passage",
  chainId: "passage-1",
  coinGeckoId: "",
  cosmostationId: "passage",
  isMainnet: true,
  symbol: "PASG",
  denom: "upasg",
  decimals: 6,
  api: [
    "https://passage-api.polkachu.com",
    "https://api.passage.nodestake.top"
  ],
  description: "Passage is building a virtual 3D world/metaverse that is mainly powered by Unreal Engine 5, Akash, and IBC.",
  logo: "/logos/passage.png"
}

export default passageMainnet;