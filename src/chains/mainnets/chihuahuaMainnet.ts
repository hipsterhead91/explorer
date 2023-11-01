import IChain from "../../models/IChain";

const chihuahuaMainnet: IChain = {
  name: "Chihuahua",
  chainId: "chihuahua-1",
  coinGeckoId: "chihuahua-token",
  cosmostationId: "chihuahua",
  isMainnet: true,
  symbol: "HUAHUA",
  denom: "uhuahua",
  decimals: 6,
  api: [
    { provider: "Polkachu", address: "https://chihuahua-api.polkachu.com" },
    { provider: "Chihuahua", address: "https://api.chihuahua.wtf" },
    { provider: "Mercury Nodes", address: "https://chihuahua-api.mercury-nodes.net" },
    { provider: "Golden Ratio Staking", address: "https://rest-chihuahua.goldenratiostaking.net" },
    { provider: "Allnodes", address: "https://chihuahua-rest.publicnode.com" },
  ],
  descriptionEng: "The first meme coin on Cosmos ecosystem.",
  descriptionRus: "Первый мем-койн в экосистеме Cosmos.",
  logo: "/logos/chihuahua.png",
  links: {
    website: 'https://www.chihuahua.wtf/',
    github: 'https://github.com/ChihuahuaChain/chihuahua',
    twitter: 'https://twitter.com/ChihuahuaChain',
  },
}

export default chihuahuaMainnet;