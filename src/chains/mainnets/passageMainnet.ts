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
    { provider: "Nodestake", address: "https://passage-api.polkachu.com" },
    { provider: "Polkachu", address: "https://api.passage.nodestake.top" },
  ],
  descriptionEng: "Passage is building a virtual 3D world/metaverse that is mainly powered by Unreal Engine 5, Akash, and IBC.",
  descriptionRus: "Passage создает виртуальный 3D-мир/метавселенную, которая в основном работает на Unreal Engine 5, Akash и IBC.",
  logo: "/logos/passage.png",
  links: {
    website: 'https://www.passage.io/',
    github: '',
    twitter: 'https://twitter.com/passageio',
  },
}

export default passageMainnet;